import mongoose from 'mongoose';
import 'dotenv/config';
const connectionString = process.env.CONNECTION_STRING || '';

if (connectionString && connectionString !== '') {
    console.log('CONNECTION_STRING: OK');
    console.log(`CONNECTION_STRING: ${connectionString}`);
} else {
    console.log('CONNECTION_STRING: Failed');
}

/**
 * Connects To The MongoDB
 * @throws will throw an error if connection fails.
 */
export const connectDB = async () => {
    try {
        await mongoose
            .connect(connectionString as string, {
                // Connection Options
            })
            .then(() => {
                console.log(`MongoDB Connected, Ready State: ${mongoose.connection.readyState}`);
                console.log(
                    `MongoDB Host: ${mongoose.connection.host}:${mongoose.connection.port}`,
                );
                console.log(`MongoDB Database Name: ${mongoose.connection.name}`);
            })
            .catch((err) => console.log(err));
    } catch (error) {
        console.log(`Database Connection Error: ${error}`);
        throw error;
    }
};
