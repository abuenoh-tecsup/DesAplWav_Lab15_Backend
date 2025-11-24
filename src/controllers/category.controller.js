const Category = require('../models/Category');

// Obtener todas las categorías
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();

        res.json({
            success: true,
            message: 'Categorías obtenidas correctamente',
            data: categories
        });
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener categorías',
            data: null
        });
    }
};
