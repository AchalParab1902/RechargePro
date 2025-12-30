const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['Mobile', 'DTH', 'DataCard', 'Landline', 'Electricity', 'Gas', 'Water', 'Other'],
    default: 'Mobile'
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  validity: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;
