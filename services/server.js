const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const connectDB = require('./backend/config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Static folder
app.use(express.static(path.join(__dirname)));
app.use('/uploads', express.static(path.join(__dirname, 'backend/uploads')));

// Routes
app.use('/api/auth', require('./backend/routes/authRoutes'));
app.use('/api/jobs', require('./backend/routes/jobRoutes'));
app.use('/api/messages', require('./backend/routes/messageRoutes'));

// Serve frontend for any unknown route (SPA fallback if needed, but here we have static HTMLs)
app.get('*', (req, res) => {
    // If it's an API call, return 404
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ message: 'API route not found' });
    }
    // Otherwise serve index.html or handle 404
    // Since we use express.static, valid files are served. Invalid ones fall here.
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
