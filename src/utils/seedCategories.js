const Category = require('../models/Category');

async function seedCategories() {
    try {
        const existing = await Category.findAll();

        if (existing.length === 0) {
            await Category.bulkCreate([
                { name: 'Laptops' },
                { name: 'Accesorios' },
                { name: 'Monitores' },
                { name: 'Teclados' },
                { name: 'Audífonos' }
            ]);

            console.log('Seeded categories: Laptops, Accesorios, Monitores, Teclados, Audífonos');
        } else {
            console.log('Categories already exist, skipping seeding.');
        }
    } catch (error) {
        console.error("Error in seedCategories:", error);
    }
}

module.exports = seedCategories;
