import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Config {
    jwtSecret: string;
    nodeEnv: string;
    port: number;
    mongoUri: string;
    firebase: {
        projectId: string;
        clientEmail: string;
        privateKey: string;
    };
}

// Try to load Firebase config from service account file first
function loadFirebaseConfig() {
    try {
        const serviceAccountPath = path.join(__dirname,
            '../../../firebase-service-account.json',
        );
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
        return {
            projectId: serviceAccount.project_id,
            clientEmail: serviceAccount.client_email,
            privateKey: serviceAccount.private_key,
        };
    } catch (error) {
        console.warn(
            'Could not load Firebase service account file, checking environment variables...',
        );
        return {
            projectId: process.env.FIREBASE_PROJECT_ID || '',
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
        };
    }
}

const firebaseConfig = loadFirebaseConfig();

const config: Config = {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key-here',
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '5001', 10),
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce',
    firebase: firebaseConfig,
};

// Validate required configuration
if (!config.jwtSecret) {
    throw new Error('JWT_SECRET is required in environment variables');
}

if (!config.firebase.projectId || !config.firebase.clientEmail || !config.firebase.privateKey) {
    console.warn('Firebase Admin not fully configured. Firebase features may not work correctly.');
}

export default config;
