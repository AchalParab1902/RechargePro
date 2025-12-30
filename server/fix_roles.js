const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const fixRoles = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB...');

    const users = await User.find({});
    console.log(`Checking ${users.length} users...`);

    let updatedCount = 0;
    for (const user of users) {
      if (user.role && user.role !== user.role.toUpperCase()) {
        const oldRole = user.role;
        user.role = user.role.toUpperCase();
        await user.save();
        console.log(`Updated user ${user.email}: ${oldRole} -> ${user.role}`);
        updatedCount++;
      }
    }

    console.log(`Finished. Updated ${updatedCount} users.`);
    process.exit();
  } catch (error) {
    console.error('Error fixing roles:', error);
    process.exit(1);
  }
};

fixRoles();
