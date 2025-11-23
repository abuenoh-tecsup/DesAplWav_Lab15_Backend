const express = require('express');
const UserController = require('../controllers/user.controller');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

const router = express.Router();

router.get('/', authenticate, authorize(['admin']), UserController.getAll);

router.get('/me', authenticate, authorize([]), UserController.getMe);

module.exports = router;
