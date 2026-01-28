import { Users, IUsers } from '../models/users.model.ts';

export const createUser = async (data: Pick<IUsers, 'name' | 'email' | 'age' | 'firebaseUid'>) => {
    return Users.create(data);
};

export const findOrCreateUser = async (firebaseUser: {
    uid: string;
    email: string | null;
    displayName?: string | null;
}) => {
    // Try to find user by firebaseUid
    let user = await Users.findOne({ firebaseUid: firebaseUser.uid }).lean();

    // If user doesn't exist, create a new one
    if (!user && firebaseUser.email) {
        user = await Users.create({
            id: firebaseUser.uid, // Use Firebase UID as the user ID
            firebaseUid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
            cartItems: [], // Initialize empty cart
        });
    }

    return user;
};

export const getUsers = async () => {
    // Why .lean()?
    // Returns plain JS objects
    // Faster
    // Better TypeScript inference
    return Users.find().lean();
};
