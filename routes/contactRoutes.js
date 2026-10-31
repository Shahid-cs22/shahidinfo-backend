const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  getContactMessages,
  markMessageRead,
  deleteMessage
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

// Public contact submission
router.post('/', submitContactForm);

// Protected Admin inquiries endpoints
router.get('/messages', protect, getContactMessages);
router.patch('/messages/:id/read', protect, markMessageRead);
router.delete('/messages/:id', protect, deleteMessage);

module.exports = router;
