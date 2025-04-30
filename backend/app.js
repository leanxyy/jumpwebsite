// Load environment FIRST
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });

const path = require('path');
const express = require('express');
const cors = require('cors');
const careerRoutes = require('./routes/careerRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Debug environment
console.log('Environment:', {
    EMAIL_USER: process.env.EMAIL_USER ? '***exists***' : 'MISSING',
    NODE_ENV: process.env.NODE_ENV || 'development'
});

const app = express();

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Make sure uploads directory is accessible
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.use('/careers', careerRoutes);
app.use('/contact', contactRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start Server
const PORT = 3000; // Try changing this if 3000 doesn't work
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://10.10.100.23:${PORT}`);
});