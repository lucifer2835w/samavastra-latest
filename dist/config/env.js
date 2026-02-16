"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    jwtSecret: process.env.JWT_SECRET || 'changeme-in-prod',
    bcryptRounds: process.env.BCRYPT_ROUNDS ? Number(process.env.BCRYPT_ROUNDS) : 10,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID || '',
};
//# sourceMappingURL=env.js.map