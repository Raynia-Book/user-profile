import { dbConnect, sequelize } from './database';
import { User } from './models/User/User';

export async function initDB() {
    await dbConnect();
    // await sequelize.drop();
    await User.sync();
}