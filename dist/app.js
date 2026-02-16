"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const routes_1 = __importDefault(require("./portals/chalkboard/routes"));
const routes_2 = __importDefault(require("./portals/samavest/routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('combined'));
app.use('/api/auth', auth_routes_1.default);
app.use('/api/chalkboard', routes_1.default);
app.use('/api/erp', routes_2.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map