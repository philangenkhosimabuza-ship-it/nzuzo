const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    position: { type: String },
    message: { type: String },
    cvUrl: { type: String },
    status: { type: String, enum: ['new', 'reviewed', 'shortlisted', 'rejected'], default: 'new' },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
