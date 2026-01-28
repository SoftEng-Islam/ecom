import { Schema, model, Document, Types } from 'mongoose';

export interface IReview extends Document {
    productId: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: Date;
}

const reviewSchema = new Schema<IReview>(
    {
        productId: { type: String, required: true, index: true },
        userId: { type: String, required: true },
        userName: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

// Index to prevent multiple reviews from the same user on the same product
reviewSchema.index({ productId: 1, userId: 1 }, { unique: true });

export const Review = model<IReview>('Review', reviewSchema);
