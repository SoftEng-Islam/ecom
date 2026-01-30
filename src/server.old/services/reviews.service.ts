import { Review, IReview } from '../models/review.model.ts';
import { Products } from '../models/products.model.ts';

export const getProductReviews = async (productId: string) => {
    return Review.find({ productId }).sort({ createdAt: -1 }).lean();
};

export const addReview = async (data: Partial<IReview>) => {
    const review = await Review.create(data);

    // Update product rating metadata
    const reviews = await Review.find({ productId: data.productId });
    const count = reviews.length;
    const average = reviews.reduce((acc, r) => acc + r.rating, 0) / count;

    await Products.findOneAndUpdate(
        { id: data.productId },
        {
            averageRating: Number(average.toFixed(1)),
            reviewCount: count
        }
    );

    return review;
};
