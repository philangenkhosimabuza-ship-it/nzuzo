const express = require('express');
const router = express.Router();
const { getJobs, getJobById, createJob, applyForJob } = require('../controllers/jobController');
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'backend/uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });

router.route('/').get(getJobs).post(protect, admin, createJob);
router.route('/:id').get(getJobById);
router.post('/apply', upload.single('cv'), applyForJob);

module.exports = router;
