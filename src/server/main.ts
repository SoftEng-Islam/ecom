import 'dotenv/config';
import { app } from './app.ts';
import { connectDB } from './config/db.ts';
import express from 'express';
import ViteExpress from 'vite-express';

// Constants
const PORT: number = Number(process.env.PORT) || 3000;
const server = app.listen(5001, '0.0.0.0', () => console.log('Server is listening...'));

// development or production
ViteExpress.config({ mode: 'development' });

(async () => {
    try {
        await connectDB();
        // Start Server
        ViteExpress.bind(app, server);
    } catch (error) {
        console.error('Startup failed:', error.message);
        process.exit(1); // fatal error → exit
    }
})();
