require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB, getDBStatus } = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow frontend dev server
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health & Status check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    database: getDBStatus() ? 'connected (mongodb)' : 'active (resilient memory-engine)',
    version: '2.0.0-admin'
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/contact', contactRoutes);

// Catch-all 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server and initialize DB
const server = app.listen(PORT, async () => {
  console.log(`====================================================`);
  console.log(`🚀 Mohamed Shahid MERN Portfolio & Admin Backend`);
  console.log(`📡 Listening on: http://localhost:${PORT}`);
  console.log(`⚡ API Health:   http://localhost:${PORT}/api/health`);
  console.log(`🔐 Admin Auth:   http://localhost:${PORT}/api/auth/login`);
  console.log(`📂 Portfolio:    http://localhost:${PORT}/api/portfolio`);
  console.log(`====================================================`);
  
  // Try connecting to MongoDB
  await connectDB();
});

module.exports = { app, server };
