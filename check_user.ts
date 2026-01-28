import mongoose from 'mongoose';
import { Users } from './src/server/models/users.model.ts';
import 'dotenv/config';

async function check() {
    await mongoose.connect(process.env.CONNECTION_STRING || '');
    const user = await Users.findOne({ email: 'softeng.islam@gmail.com' }).lean();
    console.log(JSON.stringify(user, null, 2));
    process.exit(0);
}
check();
