"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
const auth_service_1 = require("./auth.service");
const service = new auth_service_1.AuthService();
async function login(req, res) {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, hasPassword: !!password });
    if (!email || !password) {
        console.log('Missing email or password');
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        const result = await service.validateUser(email, password);
        console.log('Validation result:', result ? 'Success' : 'Failed');
        if (!result) {
            console.log('Invalid credentials for:', email);
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        console.log('Login successful for:', email);
        return res.json(result);
    }
    catch (err) {
        console.error('Login error:', err);
        console.error('Error details:', JSON.stringify(err, null, 2));
        return res.status(500).json({ error: 'Login failed' });
    }
}
//# sourceMappingURL=auth.controller.js.map