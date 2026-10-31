const ContactMessage = require('../models/ContactMessage');
const { getDBStatus } = require('../config/db');

// In-memory fallback inbox
let memoryMessages = [];

/**
 * @desc Handle contact form submission
 * @route POST /api/contact
 */
const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields: name, email, and message.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    const newEntry = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: (subject || 'Portfolio Inquiry').trim(),
      message: message.trim(),
      read: false,
      createdAt: new Date()
    };

    if (getDBStatus()) {
      const savedDoc = await ContactMessage.create({
        ...newEntry,
        ip: req.ip || req.headers['x-forwarded-for']
      });

      console.log(`[Contact] New message saved to MongoDB from ${name} (${email})`);
      return res.status(201).json({
        success: true,
        message: 'Thank you for reaching out! Your message has been received.',
        data: { id: savedDoc._id, createdAt: savedDoc.createdAt }
      });
    } else {
      const memDoc = { _id: `msg_${Date.now()}`, ...newEntry };
      memoryMessages.unshift(memDoc);
      console.log(`[Contact] New message cached in memory from ${name} (${email}): "${message.substring(0, 40)}..."`);
      return res.status(201).json({
        success: true,
        message: 'Thank you for reaching out! Your message has been received.',
        data: { id: memDoc._id, createdAt: newEntry.createdAt }
      });
    }
  } catch (error) {
    console.error('Contact submission error:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your message.'
    });
  }
};

/**
 * @desc Get all submitted inquiries (Admin protected)
 * @route GET /api/contact/messages
 */
const getContactMessages = async (req, res) => {
  try {
    if (getDBStatus()) {
      const messages = await ContactMessage.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: messages.length, data: messages });
    } else {
      return res.status(200).json({ success: true, count: memoryMessages.length, data: memoryMessages });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * @desc Mark message as read
 * @route PATCH /api/contact/messages/:id/read
 */
const markMessageRead = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const msg = await ContactMessage.findByIdAndUpdate(id, { read: true }, { new: true });
      if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
      return res.status(200).json({ success: true, message: 'Message marked as read', data: msg });
    } else {
      const msg = memoryMessages.find(m => m._id.toString() === id.toString());
      if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
      msg.read = true;
      return res.status(200).json({ success: true, message: 'Message marked as read', data: msg });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * @desc Delete message
 * @route DELETE /api/contact/messages/:id
 */
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const msg = await ContactMessage.findByIdAndDelete(id);
      if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
      return res.status(200).json({ success: true, message: 'Message deleted' });
    } else {
      memoryMessages = memoryMessages.filter(m => m._id.toString() !== id.toString());
      return res.status(200).json({ success: true, message: 'Message deleted from memory' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  submitContactForm,
  getContactMessages,
  markMessageRead,
  deleteMessage
};
