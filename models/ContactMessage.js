const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    maxlength: 100
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  subject: {
    type: String,
    trim: true,
    default: 'Portfolio Inquiry'
  },
  message: { 
    type: String, 
    required: [true, 'Message cannot be empty'],
    maxlength: 2000 
  },
  ip: { type: String },
  read: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);

