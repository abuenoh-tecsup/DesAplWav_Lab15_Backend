const Product = require('../models/Product');
const Category = require('../models/Category');

// =======================
// 1. Obtener todos los productos (incluye categorías)
// =======================
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                {
                    model: Category,
                    as: 'categories',
                    through: { attributes: [] } // Oculta tabla pivote
                }
            ]
        });

        res.json({
            success: true,
            message: 'Productos obtenidos correctamente',
            data: products
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener productos',
            data: null
        });
    }
};

// =======================
// 2. Obtener producto por ID (incluye categorías)
// =======================
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [
                {
                    model: Category,
                    as: 'categories',
                    through: { attributes: [] }
                }
            ]
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado',
                data: null
            });
        }

        res.json({
            success: true,
            message: 'Producto obtenido correctamente',
            data: product
        });
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener producto',
            data: null
        });
    }
};

// =======================
// 3. Crear un nuevo producto (con categorías)
// =======================
exports.createProduct = async (req, res) => {
    try {
        const { nombre, precio, descripcion, imageUrl, categoryIds } = req.body;

        if (!nombre || !precio) {
            return res.status(400).json({
                success: false,
                message: 'Nombre y precio son requeridos',
                data: null
            });
        }

        if (precio <= 0) {
            return res.status(400).json({
                success: false,
                message: 'El precio debe ser mayor a 0',
                data: null
            });
        }

        const product = await Product.create({
            nombre,
            precio,
            descripcion,
            imageUrl
        });

        // Asociar categorías si vienen
        if (Array.isArray(categoryIds) && categoryIds.length > 0) {
            await product.setCategories(categoryIds);
        }

        // Obtener producto actualizado con categorías
        const fullProduct = await Product.findByPk(product.id, {
            include: { model: Category, as: 'categories' }
        });

        res.status(201).json({
            success: true,
            message: 'Producto creado correctamente',
            data: fullProduct
        });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear producto',
            data: null
        });
    }
};

// =======================
// 4. Actualizar un producto (con categorías)
// =======================
exports.updateProduct = async (req, res) => {
    try {
        const { nombre, precio, descripcion, imageUrl, categoryIds } = req.body;

        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado',
                data: null
            });
        }

        if (precio && precio <= 0) {
            return res.status(400).json({
                success: false,
                message: 'El precio debe ser mayor a 0',
                data: null
            });
        }

        await product.update({
            nombre,
            precio,
            descripcion,
            imageUrl
        });

        // Actualizar categorías si vienen
        if (Array.isArray(categoryIds)) {
            await product.setCategories(categoryIds);
        }

        const updatedProduct = await Product.findByPk(product.id, {
            include: { model: Category, as: 'categories' }
        });

        res.json({
            success: true,
            message: 'Producto actualizado correctamente',
            data: updatedProduct
        });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar producto',
            data: null
        });
    }
};

// =======================
// 5. Eliminar producto
// =======================
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado',
                data: null
            });
        }

        await product.destroy();

        res.json({
            success: true,
            message: 'Producto eliminado correctamente',
            data: null
        });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar producto',
            data: null
        });
    }
};
