import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth, DecodedIdToken } from 'firebase-admin/auth';
import config from '@server/config/index.ts';

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
    if (config.firebase.projectId && config.firebase.clientEmail && config.firebase.privateKey) {
        initializeApp({
            credential: cert({
                projectId: config.firebase.projectId,
                clientEmail: config.firebase.clientEmail,
                privateKey: config.firebase.privateKey,
            }),
        });
    } else {
        console.warn('Firebase Admin not initialized - missing configuration');
    }
}

export const verifyIdToken = async (token: string): Promise<DecodedIdToken | null> => {
    try {
        const auth = getAuth();
        const decodedToken = await auth.verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
};

export const authMiddleware = async (req: any, res: any, next: any) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'No authorization header' });
        }

        const token = authHeader.split(' ')[1];
        const decodedToken = await verifyIdToken(token);

        if (!decodedToken) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        // Add the user to the request object
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ message: 'Authentication failed' });
    }
};
