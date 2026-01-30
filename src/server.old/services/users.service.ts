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
    let user = await Users.findOne({ firebaseUid: firebaseUser.uid });

    // If user doesn't exist, create a new one
    if (!user && firebaseUser.email) {
        user = await Users.create({
            id: firebaseUser.uid, // Use Firebase UID as the user ID
            firebaseUid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
            cartItems: [], // Initialize empty cart
        });
    } else if (user && firebaseUser.displayName && user.name !== firebaseUser.displayName) {
        // If user exists but name has changed in Firebase, update it
        user.name = firebaseUser.displayName;
        await user.save();
    }

    return user ? user.toObject() : null;
};

export const getUsers = async () => {
    // Why .lean()?
    // Returns plain JS objects
    // Faster
    // Better TypeScript inference
    return Users.find().lean();
};
