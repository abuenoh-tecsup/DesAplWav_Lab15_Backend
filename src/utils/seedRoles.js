const Role = require('../models/Role');

async function seedRoles() {
    try {
        const existing = await Role.findAll();

        if (existing.length === 0) {
            await Role.create({ name: 'CUSTOMER' });
            await Role.create({ name: 'ADMIN' });

            console.log('Seeded roles: CUSTOMER, ADMIN');
        } else {
            console.log('Roles already exist, skipping seeding.');
        }
    } catch (error) {
        console.error("Error in seedRoles:", error);
    }
}

module.exports = seedRoles;
