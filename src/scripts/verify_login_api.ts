
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/login';

async function testLogin(email: string, password: string, roleName: string) {
    console.log(`\nTesting ${roleName} login (${email})...`);
    try {
        const response = await axios.post(API_URL, { email, password });
        console.log(`✅ ${roleName} Login Successful!`);
        console.log(`   Status: ${response.status}`);
        console.log(`   Token received: ${!!response.data.token}`);
        console.log(`   User: ${response.data.user.firstName} ${response.data.user.lastName} (${response.data.user.roles.map((r: any) => r.name).join(', ')})`);
    } catch (error: any) {
        console.log(`❌ ${roleName} Login Failed!`);
        if (error.response) {
            console.log(`   Status: ${error.response.status}`);
            console.log(`   Data:`, error.response.data);
        } else {
            console.log(`   Error: ${error.message}`);
        }
    }
}

async function main() {
    console.log('--- Verifying Login API ---');

    // 1. Test Admin
    await testLogin('admin@samavest.com', 'admin123', 'Admin');

    // 2. Test Teacher
    await testLogin('jane.smith@school.com', 'teacher123', 'Teacher');

    // 3. Test Invalid Credentials (to ensure it fails correctly)
    await testLogin('admin@samavest.com', 'wrongpassword', 'Invalid Admin');
}

main();
