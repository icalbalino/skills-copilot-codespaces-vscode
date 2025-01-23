// Create web server
// Run: node comments.js
// Open browser and enter: http://localhost:3000
// Stop server: Ctrl+C

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const comments = [];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    if (pathname === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Internal Server Error');
            } else {
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    } else if (pathname === '/comments' && req.method === 'POST') {
        let body = '';
        req.setEncoding('utf8');
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const comment = JSON.parse(body);
            comments.push(comment);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(comment));
        });
    } else if (pathname === '/comments' && req.method === 'GET') {
        const commentString = JSON.stringify(comments);
        res.setHeader('Content-Type', 'application/json');
        res.end(commentString);
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(3000);
console.log('Server is running at http://localhost:3000');