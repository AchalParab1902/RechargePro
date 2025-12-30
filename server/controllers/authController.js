const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, companyName, contactNumber, company: parentCompany } = req.body;

    const normalizedRole = (role || 'USER').toUpperCase();

    // Prevent Admin registration via API
    if (normalizedRole === 'ADMIN') {
        return res.status(403).json({ message: 'Admin signup not allowed' });
    }

    // Only allow specific roles
    if (!['USER', 'COMPANY'].includes(normalizedRole)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Password Validation (Min 8 chars, 1 uppercase, 1 lowercase, 1 number)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number' 
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Map name correctly: use companyName for COMPANY role, otherwise use the name field
    const finalName = role === 'COMPANY' ? (companyName || name) : (name || companyName);

    const user = await User.create({
      name: finalName,
      email,
      password,
      role: normalizedRole,
      company: parentCompany || null
    });

    if (user) {
      const responseData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role)
      };

      // If role is COMPANY, create a profile automatically with the provided details
      if (user.role === 'COMPANY') {
        const Company = require('../models/Company');
        await Company.create({
          user: user._id,
          companyName: user.name,
          businessEmail: user.email,
          contactNumber: contactNumber || 'N/A',
          address: 'N/A'
        });
      }

      res.status(201).json(responseData);
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(`[REGISTER_ERROR]: ${error.message}`);
    res.status(500).json({ 
      message: 'Server Error during registration', 
      error: error.message 
    });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check for Hard-coded Admin
    if (email === process.env.ADMIN_EMAIL) {
        if (password === process.env.ADMIN_PASSWORD) {
            return res.json({
                _id: process.env.ADMIN_ID || 'admin_root',
                name: 'System Administrator',
                email: process.env.ADMIN_EMAIL,
                role: 'ADMIN',
                token: generateToken(process.env.ADMIN_ID || 'admin_root', 'ADMIN')
            });
        } else {
            return res.status(401).json({ message: 'Invalid admin credentials' });
        }
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role.toUpperCase(),
        token: generateToken(user._id, user.role.toUpperCase())
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(`[LOGIN_ERROR]: ${error.message}`);
    res.status(500).json({ message: 'Server Error during login' });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    let walletBalance = req.user.walletBalance;
    
    // If COMPANY, we might need to fetch from Company model instead of User model
    // depending on where the 'shared' balance is conceptually. 
    // In our implementation, Company model has its own walletBalance.
    if (req.user.role === 'COMPANY') {
      const Company = require('../models/Company');
      const companyProfile = await Company.findOne({ user: req.user._id });
      if (companyProfile) {
        walletBalance = companyProfile.walletBalance;
      }
    }

    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      walletBalance
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }

      // Normalize existing role to prevent validation errors if legacy data is lowercase
      if (user.role) {
        user.role = user.role.toUpperCase();
      }

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        token: req.headers.authorization.split(' ')[1]
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  authUser,
  getMe,
  updateProfile
};
