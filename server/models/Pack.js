const mongoose = require('mongoose');

const packSchema = mongoose.Schema({
  packName: {
    type: String,
    required: true,
    trim: true
  },
  plans: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: true
  }],
  totalPrice: {
    type: Number,
    required: true,
    min: 0
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

const Pack = mongoose.model('Pack', packSchema);
module.exports = Pack;
