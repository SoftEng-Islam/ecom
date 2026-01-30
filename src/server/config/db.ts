import mongoose from 'mongoose';
import 'dotenv/config';
import chalk from 'chalk';

const connectionString = process.env.CONNECTION_STRING || '';

// Connection status check with chalk
if (connectionString && connectionString !== '') {
    console.log(
        chalk.green.bold('✓ CONNECTION_STRING:'),
        chalk.green('Valid connection string found'),
    );
    console.log(
        chalk.blue.dim('   Connection string:'),
        chalk.blue.dim(connectionString.substring(0, 20) + '...'),
    ); // Show only first 20 chars for security
} else {
    console.error(
        chalk.red.bold('✗ CONNECTION_STRING:'),
        chalk.red('Missing or invalid connection string'),
    );
}

/**
 * Connects To The MongoDB
 * @throws will throw an error if connection fails.
 */
export const connectDB = async () => {
    const spinner = ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'];
    let i = 0;
    const spinnerInterval = setInterval(() => {
        process.stdout.write(
            `\r${chalk.cyan(spinner[i++ % spinner.length])} Connecting to MongoDB...`,
        );
    }, 100);

    try {
        await mongoose
            .connect(connectionString as string, {
                // Connection Options
            })
            .then(() => {
                clearInterval(spinnerInterval);
                console.log(
                    `\r${chalk.green.bold('✓')} ${chalk.green('MongoDB Connected')} ${chalk.gray(`[${new Date().toLocaleTimeString()}]`)}`,
                );
                console.log(chalk.blueBright('   Host:'), chalk.cyan(mongoose.connection.host));
                console.log(chalk.blueBright('   Database:'), chalk.cyan(mongoose.connection.name));
                console.log(
                    chalk.blueBright('   Ready State:'),
                    mongoose.connection.readyState === 1
                        ? chalk.green('Connected')
                        : chalk.yellow(`Warning: State ${mongoose.connection.readyState}`),
                );
            })
            .catch((err) => {
                clearInterval(spinnerInterval);
                console.error(
                    `\r${chalk.red.bold('✗')} ${chalk.red('MongoDB Connection Error:')} ${chalk.red(err.message)}`,
                );
                if (err.message.includes('ECONNREFUSED')) {
                    console.log(
                        chalk.yellow(
                            '   Make sure MongoDB is running and the connection string is correct.',
                        ),
                    );
                    console.log(
                        chalk.yellow('   If using a local instance, try:'),
                        chalk.cyan('sudo service mongod start'),
                    );
                }
            });
    } catch (error: unknown) {
        clearInterval(spinnerInterval);
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (error && typeof error === 'object' && 'message' in error) {
            errorMessage = String(error.message);
        } else if (typeof error === 'string') {
            errorMessage = error;
        }
        console.error(
            `\r${chalk.red.bold('✗')} ${chalk.red('Fatal Database Error:')} ${chalk.red(errorMessage)}`,
        );
        process.exit(1);
    }
};
