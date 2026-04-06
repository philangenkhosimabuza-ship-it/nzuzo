const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    serviceType: { type: String },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'read', 'archived'], default: 'new' },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
