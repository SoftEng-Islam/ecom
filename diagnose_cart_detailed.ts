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
            console.log(`Checking user ${user.id} (${user.email})...`);
            if (user.cartItems) {
                console.log(`- cartItems type: ${typeof user.cartItems}, isArray: ${Array.isArray(user.cartItems)}`);
                if (Array.isArray(user.cartItems)) {
                    user.cartItems.forEach((item, index) => {
                        console.log(`  - index ${index}:`, JSON.stringify(item));
                        if (!item) {
                            console.log(`    !!! Item is null/undefined`);
                        } else if (typeof item === 'string') {
                            console.log(`    (Legacy string item)`);
                        } else if (typeof item === 'object') {
                            if (!item.productId) {
                                console.log(`    !!! Missing productId`);
                            }
                        }
                    });
                }
            } else {
                console.log(`- No cartItems field`);
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
