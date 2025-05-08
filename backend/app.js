// Load environment FIRST
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const fs = require('fs'); // Required for debug logs
const path = require('path');
const express = require('express');
const cors = require('cors');
const careerRoutes = require('./routes/careerRoutes');
const contactRoutes = require('./routes/contactRoutes');

// ======================
// DEBUGGING LOGS (REMOVE IN PRODUCTION)
// ======================
console.log('🚀 Starting server with environment:', {
    EMAIL_USER: process.env.EMAIL_USER ? '***exists***' : 'MISSING',
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 'Not set (using default 3000)'
});
console.log('📁 Current directory:', __dirname);
try {
    console.log('📂 Public files:', fs.readdirSync(path.join(__dirname, 'public')));
} catch (err) {
    console.error('❌ Missing public folder! Fix path:', err);
}
// ======================

const app = express();

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (IMPORTANT: Adjust path if your folder structure differs)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/careers', careerRoutes);
app.use('/contact', contactRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error('💥 Server error:', err.stack);
    res.status(500).json({ 
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start Server (CRITICAL FIX: Use Railway's dynamic port)
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server successfully running on port ${PORT}`);
    console.log(`🌐 Access URL: https://${process.env.RAILWAY_PUBLIC_DOMAIN || `localhost:${PORT}`}`);
});
