const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Plan = require('./models/Plan');
const User = require('./models/User');

dotenv.config();

const diagnose = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected.');

    // Find a company user
    const companyUser = await User.findOne({ role: /company/i });
    if (!companyUser) {
      console.log('No company user found to test with.');
      process.exit(0);
    }

    console.log(`Testing Plan fetch for company: ${companyUser.name} (${companyUser._id})`);

    try {
      const plans = await Plan.find({ company: companyUser._id }).sort({ createdAt: -1 });
      console.log(`Search successful. Found ${plans.length} plans.`);
    } catch (err) {
      console.error('Plan.find error:', err.message);
      console.error(err.stack);
    }

    // Check all plans to see if any have invalid company refs
    const allPlans = await Plan.find({});
    console.log(`Analyzing ${allPlans.length} total plans...`);
    
    for (const plan of allPlans) {
      if (!plan.company) {
        console.warn(`CRITICAL: Plan ${plan.name} (${plan._id}) has no company field!`);
      } else {
        const companyExists = await User.findById(plan.company);
        if (!companyExists) {
          console.warn(`WARNING: Plan ${plan.name} (${plan._id}) references non-existent company: ${plan.company}`);
        }
      }
    }

    console.log('Diagnosis complete.');
    process.exit(0);
  } catch (error) {
    console.error('Diagnostic failed:', error.message);
    process.exit(1);
  }
};

diagnose();
