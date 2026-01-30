import { Router } from 'express';
import { getReviewsHandler, addReviewHandler } from '../controllers/reviews.controller.ts';
import { authMiddleware } from '../middleware/auth.middleware.ts';

const router = Router();

router.get('/:productId', getReviewsHandler);
router.post('/:productId', authMiddleware, addReviewHandler);

export default router;
