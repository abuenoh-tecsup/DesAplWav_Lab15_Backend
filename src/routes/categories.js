const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

router.get(
    '/',
    authenticate,
    authorize(['CUSTOMER', 'ADMIN']),
    categoryController.getAllCategories
);

module.exports = router;
