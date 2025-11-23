const authService = require('../services/AuthService');

class AuthController {
    async signUp(req, res, next) {
        try {
            const data = await authService.signUp(req.body);
            res.status(201).json(data);
        } catch (err) {
            next(err);
        }
    }

    async signIn(req, res, next) {
        try {
            const token = await authService.signIn(req.body);
            res.status(200).json(token);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AuthController();
