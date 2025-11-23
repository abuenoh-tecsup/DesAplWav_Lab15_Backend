const Role = require('../models/Role');

class RoleRepository {
    async findByName(name) {
        return Role.findOne({ where: { name } });
    }

    async create(roleData) {
        return Role.create(roleData);
    }

    async getAll() {
        return Role.findAll();
    }
}

module.exports = new RoleRepository();
