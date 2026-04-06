const asyncHandler = require('express-async-handler');
const Job = require('../models/Job');
const Application = require('../models/Application');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find({ status: 'open' });
    res.json(jobs);
});

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (job) {
        res.json(job);
    } else {
        res.status(404);
        throw new Error('Job not found');
    }
});

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private/Admin
const createJob = asyncHandler(async (req, res) => {
    const { title, description, department, requirements, closingDate } = req.body;

    const job = new Job({
        title,
        description,
        department,
        requirements,
        closingDate,
    });

    const createdJob = await Job.create(job);
    res.status(201).json(createdJob);
});

// @desc    Apply for a job
// @route   POST /api/jobs/apply
// @access  Public
const applyForJob = asyncHandler(async (req, res) => {
    const { jobId, fullName, email, phone, message } = req.body;
    
    const application = new Application({
        jobId: jobId || null,
        fullName,
        email,
        phone,
        message,
        cvUrl: req.file ? `/uploads/${req.file.filename}` : '',
    });

    const createdApplication = await Application.create(application);
    res.status(201).json(createdApplication);
});

module.exports = { getJobs, getJobById, createJob, applyForJob };
