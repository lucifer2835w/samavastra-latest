
const http = require('http');

function postRequest(email, password, callback) {
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

    const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
            if (res.statusCode === 200) {
                const response = JSON.parse(body);
                callback(response.token);
            } else {
                console.log(`❌ Login Failed! Status: ${res.statusCode}`);
            }
        });
    });
    req.write(data);
    req.end();
}

function getStudents(token) {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/samavest/students',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            console.log(`\nTesting GET /api/samavest/students...`);
            if (res.statusCode === 200) {
                console.log('✅ Success!');
                try {
                    const data = JSON.parse(body);
                    console.log('Data structure keys:', Object.keys(data));
                    if (data.students) {
                        console.log(`Received ${data.students.length} students`);
                    } else if (Array.isArray(data)) {
                        console.log(`Received array of ${data.length} students`);
                    }
                } catch (e) {
                    console.log('Response is not JSON:', body.substring(0, 100));
                }
            } else {
                console.log(`❌ Failed! Status: ${res.statusCode}`);
                console.log('Body:', body);
            }
        });
    });
    req.end();
}

console.log('--- Verifying Students API ---');
postRequest('admin@samavest.com', 'admin123', (token) => {
    console.log('Got token, fetching students...');
    getStudents(token);
});
