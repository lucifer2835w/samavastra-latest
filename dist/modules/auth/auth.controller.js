"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
const auth_service_1 = require("./auth.service");
const service = new auth_service_1.AuthService();
async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        const result = await service.validateUser(email, password);
        if (!result) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        return res.json(result);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Login failed' });
    }
}
//# sourceMappingURL=auth.controller.js.map