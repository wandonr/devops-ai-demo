const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello AI-powered DevOps World!\n');
    });

    server.listen(3000, () => {
        console.log('Server is running at http://localhost:3000/');
    });