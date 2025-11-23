const express = require('express');
const AuthController = require('../controllers/auth.controller')
const router = express.Router();

router.post('/signUp', AuthController.signUp);
router.post('/signIn', AuthController.signIn);

module.exports = router;
