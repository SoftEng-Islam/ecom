// Shared Types
declare namespace SharedTypes {
    interface IUser {
        id: string;
        name: string;
        email: string;
        age: number;
        password: string;
        phone?: string;
        role: string;
        address?: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        };
        cartItems: string[];
    }

    interface IProduct {
        id: string;
        name: string;
        type: string;
        tags: string[];
        description: string;
        basePrice: number; // Base price in USD or your chosen currency
        currency: string; // e.g., 'USD', 'EUR'
        convertedPrice?: number; // Optional: calculated on the fly
        imageUrl: string;
        dueDate: Date;
        // New for other features
        taxRate?: number; // e.g., 0.08 for 8% tax
        vatRate?: number; // e.g., 0.20 for 20% VAT
        salePrice?: number; // Flash sale price
        saleStart?: Date;
        saleEnd?: Date;
    }

    interface ICart extends IProduct {
        quantity: number;
    }

    interface ApiResponse<T> {
        data: T;
        message?: string;
        success: boolean;
    }
}

export = SharedTypes;
export as namespace SharedTypes;
