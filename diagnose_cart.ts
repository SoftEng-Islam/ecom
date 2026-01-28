// npx tsx diagnose_cart.ts
// # or
// npx tsx diagnose_cart_detailed.ts;

import mongoose from 'mongoose';
import { Users } from './src/server/models/users.model.ts';
import 'dotenv/config';

async function diagnose() {
    const connectionString = process.env.CONNECTION_STRING || "";
    if (!connectionString) {
        console.error("No CONNECTION_STRING found in .env");
        process.exit(1);
    }

    try {
        await mongoose.connect(connectionString);
        console.log("Connected to MongoDB");

        const users = await Users.find({}).lean();
        console.log(`Found ${users.length} users`);

        users.forEach(user => {
            if (user.cartItems && user.cartItems.length > 0) {
                user.cartItems.forEach((item, index) => {
                    if (typeof item === 'object') {
                        if (!item.productId) {
                            console.log(`User ${user.id} (${user.email}) has invalid item at index ${index}:`, item);
                        }
                    } else if (typeof item !== 'string') {
                        console.log(`User ${user.id} (${user.email}) has non-object/non-string item at index ${index}:`, item);
                    }
                });
            }
        });

        console.log("Diagnosis complete.");
        process.exit(0);
    } catch (err) {
        console.error("Error during diagnosis:", err);
        process.exit(1);
    }
}

diagnose();
