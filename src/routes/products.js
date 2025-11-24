const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

router.get(
    '/',
    authenticate,
    authorize(['CUSTOMER', 'ADMIN']),
    productController.getAllProducts
);

router.get(
    '/:id',
    authenticate,
    authorize(['CUSTOMER', 'ADMIN']),
    productController.getProductById
);

router.post(
    '/',
    authenticate,
    authorize(['ADMIN']),
    productController.createProduct
);

router.put(
    '/:id',
    authenticate,
    authorize(['ADMIN']),
    productController.updateProduct
);

router.delete(
    '/:id',
    authenticate,
    authorize(['ADMIN']),
    productController.deleteProduct
);

module.exports = router;