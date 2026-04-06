const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');

// @desc    Log a message
// @route   POST /api/messages
// @access  Public
const logMessage = asyncHandler(async (req, res) => {
    const { fullName, phone, email, serviceType, message } = req.body;

    const newMessage = await Message.create({
        fullName,
        phone,
        email,
        serviceType,
        message,
    });

    res.status(201).json(newMessage);
});

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
const getMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
});

module.exports = { logMessage, getMessages };
