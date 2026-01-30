import { Request, Response } from 'express';
import * as reviewService from '../services/reviews.service.ts';

export const getReviewsHandler = async (req: Request, res: Response) => {
    const reviews = await reviewService.getProductReviews(req.params.productId);
    res.json(reviews);
};

export const addReviewHandler = async (req: any, res: Response) => {
    const { rating, comment, userName } = req.body;
    const productId = req.params.productId;
    const userId = req.user?.uid;

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const review = await reviewService.addReview({
            productId,
            userId,
            userName: userName || 'Anonymous',
            rating,
            comment
        });
        res.status(201).json(review);
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'You have already reviewed this product' });
        }
        res.status(500).json({ message: err.message });
    }
};
