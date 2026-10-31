const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { getDBStatus } = require('../config/db');
const { JWT_SECRET } = require('../middleware/authMiddleware');

// Fallback admin credentials
const DEFAULT_ADMIN = {
  id: 'admin_shahid_001',
  name: 'Mohamed Shahid',
  email: 'moh.shahid2004@gmail.com',
  passwordHash: bcrypt.hashSync('shahidety@2004', 10),
  role: 'admin'
};

const generateToken = (id, email) => {
  return jwt.sign({ id, email, role: 'admin' }, JWT_SECRET, {
    expiresIn: '30d'
  });
};

/**
 * @desc Authenticate admin & get token
 * @route POST /api/auth/login
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (getDBStatus()) {
      let user = await User.findOne({ email: cleanEmail });

      // If database is connected but admin user is not yet created, auto-seed admin
      if (!user && cleanEmail === DEFAULT_ADMIN.email) {
        user = await User.create({
          name: DEFAULT_ADMIN.name,
          email: DEFAULT_ADMIN.email,
          password: 'shahidety@2004',
          role: 'admin'
        });
      }

      if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id, user.email);
        return res.status(200).json({
          success: true,
          message: 'Authentication successful',
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }
    } else {
      // In-memory / Fallback authentication
      const emailMatches = cleanEmail === DEFAULT_ADMIN.email;
      const passMatches = bcrypt.compareSync(password, DEFAULT_ADMIN.passwordHash);

      if (emailMatches && passMatches) {
        const token = generateToken(DEFAULT_ADMIN.id, DEFAULT_ADMIN.email);
        return res.status(200).json({
          success: true,
          message: 'Authentication successful (Resilient mode)',
          token,
          user: {
            id: DEFAULT_ADMIN.id,
            name: DEFAULT_ADMIN.name,
            email: DEFAULT_ADMIN.email,
            role: DEFAULT_ADMIN.role
          }
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication',
      error: error.message
    });
  }
};

/**
 * @desc Get current admin profile
 * @route GET /api/auth/me
 */
const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: {
        id: req.user._id || req.user.id,
        name: req.user.name || 'Mohamed Shahid',
        email: req.user.email,
        role: req.user.role
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  loginUser,
  getMe,
  DEFAULT_ADMIN
};

