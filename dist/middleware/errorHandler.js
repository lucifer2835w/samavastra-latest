"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
// Simple centralized error handler for production-style responses
function errorHandler(err, _req, res, _next) {
    console.error(err);
    const status = err.status || 500;
    const message = err.message || 'Internal server error';
    res.status(status).json({ message });
}
//# sourceMappingURL=errorHandler.js.map