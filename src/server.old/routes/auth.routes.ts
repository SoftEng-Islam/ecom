import { Router } from 'express';
import { syncUserHandler } from '../controllers/auth.controller';

const router = Router();

// Sync Firebase user with MongoDB
router.post('/sync', syncUserHandler);

export default router;
