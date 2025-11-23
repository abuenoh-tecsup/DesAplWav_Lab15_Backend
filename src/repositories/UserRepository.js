const User = require('../models/User');
const Role = require('../models/Role');

class UserRepository {
    async create(data) {
        return User.create(data);
    }

    async findByEmail(email) {
        return User.findOne({
            where: { email },
            include: [{ model: Role, as: 'roles' }]
        });
    }

    async findById(id) {
        return User.findByPk(id, {
            include: [{ model: Role, as: 'roles' }]
        });
    }

    async updatePassword(id, password) {
        return User.update({ password }, { where: { id } });
    }

    async getAll() {
        return User.findAll({
            include: [{ model: Role, as: 'roles' }]
        });
    }
}

module.exports = new UserRepository();
