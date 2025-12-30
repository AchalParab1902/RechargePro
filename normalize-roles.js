const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });

const normalizeRoles = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');
        
        const User = require('./server/models/User');
        const users = await User.find({});
        
        for (const user of users) {
            if (user.role && user.role !== user.role.toUpperCase()) {
                console.log(`Normalizing role for ${user.email}: ${user.role} -> ${user.role.toUpperCase()}`);
                user.role = user.role.toUpperCase();
                await user.save();
            }
        }
        
        console.log('Role normalization complete');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

normalizeRoles();
