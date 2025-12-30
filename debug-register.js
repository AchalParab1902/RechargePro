const mongoose = require('mongoose');
require('dotenv').config({ path: './server/.env' });
const User = require('./server/models/User');
const Company = require('./server/models/Company');

const testRegister = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    const testData = {
      name: 'Test Admin',
      email: 'test' + Date.now() + '@example.com',
      password: 'password123',
      role: 'ADMIN'
    };

    console.log('Testing User creation for ADMIN...');
    const user = await User.create({
      name: testData.name,
      email: testData.email,
      password: testData.password,
      role: testData.role
    });
    console.log('User created:', user._id);

    const testCompanyData = {
      companyName: 'Test Company ' + Date.now(),
      email: 'company' + Date.now() + '@example.com',
      password: 'password123',
      role: 'COMPANY',
      contactNumber: '1234567890'
    };

    console.log('Testing User + Company creation for COMPANY...');
    const companyUser = await User.create({
      name: testCompanyData.companyName,
      email: testCompanyData.email,
      password: testCompanyData.password,
      role: testCompanyData.role
    });
    console.log('Company User created:', companyUser._id);

    const company = await Company.create({
      user: companyUser._id,
      companyName: companyUser.name,
      businessEmail: companyUser.email,
      contactNumber: testCompanyData.contactNumber,
      address: 'N/A'
    });
    console.log('Company profile created:', company._id);

    process.exit(0);
  } catch (err) {
    console.error('ERROR DETECTED:');
    console.error(err);
    process.exit(1);
  }
};

testRegister();
