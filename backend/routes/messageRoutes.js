const express = require('express');
const router = express.Router();
const { logMessage, getMessages } = require('../controllers/messageController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(logMessage).get(protect, admin, getMessages);

module.exports = router;
