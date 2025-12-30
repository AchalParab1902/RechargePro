const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./server/models/User');

dotenv.config({ path: './server/.env' });

const checkUsers = async () => {
  try {
    const fs = require('fs');
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);

    const users = await mongoose.connection.db.collection('users').find({}).toArray();
    let output = 'Raw User Data from DB:\n';
    users.forEach(u => {
      output += `- ID: ${u._id}, Email: ${u.email}, Role: "${u.role}" (Type: ${typeof u.role})\n`;
    });
    
    fs.writeFileSync('user-roles-dump.txt', output);
    console.log('Dumped to user-roles-dump.txt');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkUsers();
