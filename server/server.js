const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes'); // Assuming admin routes are here
const companyRoutes = require('./routes/companyRoutes'); // Assuming company routes are here
const userRoutes = require('./routes/userRoutes'); // Assuming user routes are here
const walletRoutes = require('./routes/walletRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/user', userRoutes);
app.use('/api/recharge', require('./routes/rechargePaymentRoutes')); // Direct payment flow
app.use('/api/wallet', walletRoutes);
app.use('/api/payment', require('./routes/paymentRoutes'));

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

console.log('--- SERVER.JS EXECUTION REACHED END ---');
