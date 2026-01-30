import { Request, Response } from 'express';
import { findOrCreateUser } from '@server/services/users.service.ts';
import { verifyIdToken } from '@server/middleware/auth.middleware.ts';
import jwt from 'jsonwebtoken';
import config from '@server/config/index.ts';

export const syncUserHandler = async (req: Request, res: Response) => {
    try {
        // Verify the Firebase ID token
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'No authorization header' });
        }

        const token = authHeader.split(' ')[1];
        const firebaseUser = await verifyIdToken(token);

        if (!firebaseUser) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        // Find or create the user in MongoDB
        const user = await findOrCreateUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.name || firebaseUser.email?.split('@')[0] || 'User',
        });

        // Generate a JWT for the user
        const jwtToken = jwt.sign({ userId: user.id, email: user.email }, config.jwtSecret, {
            expiresIn: '7d',
        });

        // Return the user data and token
        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
            token: jwtToken,
        });
    } catch (error) {
        console.error('Error syncing user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
