import path from 'path';
import { fileURLToPath } from 'url';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import UserRouter from './api/user.ts';

// __direname workaround for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __direname = path.dirname(__filename);

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
app.use('/assets', express.static(path.join(__direname, '../../public/assets/')));

// API Routes
app.use('/user', UserRouter);
