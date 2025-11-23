// src/services/UserService.js
const userRepository = require('../repositories/UserRepository');

class UserService {
  async getAll() {
    const users = await userRepository.getAll();
    return users.map(u => ({
      id: u.id,
      email: u.email,
      name: u.name,
      roles: (u.roles || []).map(r => r.name)
    }));
  }

  async getById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      const err = new Error("Usuario no encontrado");
      err.status = 404;
      throw err;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: (user.roles || []).map(r => r.name)
    };
  }
}

module.exports = new UserService();
