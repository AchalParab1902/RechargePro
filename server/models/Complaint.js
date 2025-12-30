const mongoose = require('mongoose');

const complaintSchema = mongoose.Schema({
  recharge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recharge',
    required: true
  },
  raisedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['OPEN', 'RESOLVED'],
    default: 'OPEN'
  }
}, {
  timestamps: true
});

const Complaint = mongoose.model('Complaint', complaintSchema);
module.exports = Complaint;
