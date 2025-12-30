const mongoose = require('mongoose');

const rechargePlanSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  operator: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  validity: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  timestamps: true
});

const RechargePlan = mongoose.model('RechargePlan', rechargePlanSchema);
module.exports = RechargePlan;
