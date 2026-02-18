import fetch from 'node-fetch';

async function testLogin() {
    const email = 'teacher@chalkboard.com';
    const password = 'any-password';

    console.log(`Attempting login with ${email}...`);

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        console.log(`Status: ${response.status} ${response.statusText}`);

        if (response.ok) {
            const data = await response.json();
            console.log('Login Successful!');
            console.log('Token:', data.token ? 'Received' : 'Missing');
            console.log('User Role:', data.user?.roles[0]?.name);
        } else {
            const text = await response.text();
            console.log('Login Failed:', text);
        }
    } catch (error) {
        console.error('Network Error:', error.message);
    }
}

testLogin();
