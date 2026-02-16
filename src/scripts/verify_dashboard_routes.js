
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

function verifyRoute(token, method, path, name) {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api' + path,
        method: method,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            console.log(`\nTesting ${name} (${method} ${path})...`);
            if (res.statusCode === 200) {
                console.log('✅ Success!');
            } else {
                console.log(`❌ Failed! Status: ${res.statusCode}`);
                console.log('Body:', body);
            }
        });
    });
    req.end();
}

console.log('--- Verifying Dashboard Routes ---');
postRequest('admin@samavest.com', 'admin123', (token) => {
    console.log('Got token, checking routes...');
    // Check Orders
    verifyRoute(token, 'GET', '/samavest/orders/stats', 'Orders Stats');
    verifyRoute(token, 'GET', '/samavest/orders', 'All Orders');

    // Check Inventory
    verifyRoute(token, 'GET', '/samavest/inventory/stats', 'Inventory Stats');
    verifyRoute(token, 'GET', '/samavest/inventory/low-stock', 'Inventory Low Stock');
    verifyRoute(token, 'GET', '/samavest/inventory', 'All Inventory');

    // Check Production
    verifyRoute(token, 'GET', '/samavest/production/stats', 'Production Stats');
    verifyRoute(token, 'GET', '/samavest/production', 'All Production Logs');

    // Check Products (used in Production Dashboard form)
    verifyRoute(token, 'GET', '/samavest/products', 'All Products');
});
