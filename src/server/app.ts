import path from 'path';
import { fileURLToPath } from 'url';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import config from './config/index.ts';

console.log('Firebase Config:', {
    projectId: !!config.firebase.projectId,
    clientEmail: !!config.firebase.clientEmail,
    privateKey: !!config.firebase.privateKey,
});

import userRoutes from './routes/users.routes.ts';
import productRoutes from './routes/products.routes.ts';
import cartRoutes from './routes/cart.routes.ts';
import authRoutes from './routes/auth.routes.ts';
import reviewRoutes from './routes/reviews.routes.ts';

// __dirname workaround for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const allowedOrigins = [
    'http://localhost:5001', // Default frontend URL
    'http://localhost:3000', // Common frontend port
    'http://localhost:8080', // Common frontend port
    // Add production domain here when ready
];

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            if (allowedOrigins.indexOf(origin) === -1) {
                const msg =
                    'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }),
);

// Static files
app.use('/assets', express.static(path.join(__dirname, '../../public/assets/')));

import orderRoutes from "./routes/orders.routes.ts";
import { authMiddleware } from "./middleware/auth.middleware.ts";

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', authMiddleware, cartRoutes);
app.use('/api/orders', authMiddleware, orderRoutes);
app.use('/api/reviews', reviewRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    });
});

// Add this before the 404 handler
// app.get('/', (req, res) => {
//     res.json({
//         message: 'E-Commerce API is running',
//         endpoints: {
//             auth: '/api/auth',
//             users: '/api/users',
//             products: '/api/products',
//             cart: '/api/cart',
//         },
//     });
// });

// 404 handler
// app.use((req: Request, res: Response) => {
//     res.status(404).json({ message: 'Not Found' });
// });
