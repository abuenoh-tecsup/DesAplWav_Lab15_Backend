const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/UserRepository');
const roleRepository = require('../repositories/RoleRepository');

class AuthService {

    async signUp({ email, password, name }) {

        const existing = await userRepository.findByEmail(email);
        if (existing) {
            const err = new Error("El email ya está en uso");
            err.status = 400;
            throw err;
        }

        const hashed = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));

        // Crear usuario
        const user = await userRepository.create({
            email,
            password: hashed,
            name
        });

        // Asignar rol CUSTOMER por defecto
        const role = await roleRepository.findByName("CUSTOMER");

        if (!role) {
            const err = new Error("El rol 'CUSTOMER' no existe. Debes ejecutar el seed.");
            err.status = 500;
            throw err;
        }

        await user.setRoles([role]);

        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    }

    async signIn({ email, password }) {
        const user = await userRepository.findByEmail(email);
        if (!user) throw this.invalidCredentials();

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) throw this.invalidCredentials();

        const token = jwt.sign(
            {
                sub: user.id,
                roles: user.roles.map(r => r.name)
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return { token };
    }

    invalidCredentials() {
        const err = new Error("Credenciales inválidas");
        err.status = 401;
        return err;
    }
}

module.exports = new AuthService();
