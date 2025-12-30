const mongoose = require('mongoose');
require('dotenv').config({ path: './server/.env' });
const User = require('./server/models/User');

const check = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const users = await User.find({});
    console.log('--- USER DATA DUMP ---');
    users.forEach(u => {
      console.log(`Email: ${u.email}, Role: ${u.role}, Company: ${u.company || 'NONE'}`);
    });
    console.log('--- END DUMP ---');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

check();
