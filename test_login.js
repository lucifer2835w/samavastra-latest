const fetch = require('node-fetch');

async function testLogin() {
    const email = 'teacher@chalkboard.com';
    const password = 'any-password';

    console.log(`Step 1: Login...`);
    try {
        const loginRes = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!loginRes.ok) {
            console.log('Login failed:', await loginRes.text());
            return;
        }

        const loginData = await loginRes.json();
        console.log('Login Success. Token:', loginData.token ? 'YES' : 'NO');

        console.log(`Step 2: Authenticated /me check...`);
        const meRes = await fetch('http://localhost:3000/api/auth/me', {
            headers: { 'Authorization': `Bearer ${loginData.token}` }
        });

        if (meRes.ok) {
            console.log('ME Endpoint Success:', await meRes.json());
        } else {
            console.log('ME Endpoint Failed:', meRes.status, await meRes.text());
        }

    } catch (err) {
        console.error('Fetch error:', err.message);
    }
}

testLogin();
