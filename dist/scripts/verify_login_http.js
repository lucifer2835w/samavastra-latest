"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
function postRequest(email, password, roleName) {
    const data = JSON.stringify({ email, password });
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/auth/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
        },
    };
    const req = http_1.default.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
            console.log(`\nTesting ${roleName} login (${email})...`);
            if (res.statusCode === 200) {
                console.log(`✅ ${roleName} Login Successful!`);
                const response = JSON.parse(body);
                console.log(`   User: ${response.user.firstName} ${response.user.lastName}`);
            }
            else {
                console.log(`❌ ${roleName} Login Failed!`);
                console.log(`   Status: ${res.statusCode}`);
                console.log(`   Body: ${body}`);
            }
        });
    });
    req.on('error', (error) => {
        console.error(`Error requesting ${roleName} login:`, error);
    });
    req.write(data);
    req.end();
}
console.log('--- Verifying Login API (Node HTTP) ---');
// 1. Test Admin
postRequest('admin@samavest.com', 'admin123', 'Admin');
// 2. Test Teacher (delay to avoid log overlap)
setTimeout(() => {
    postRequest('jane.smith@school.com', 'teacher123', 'Teacher');
}, 1000);
//# sourceMappingURL=verify_login_http.js.map