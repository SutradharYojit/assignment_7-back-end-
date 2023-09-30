// Entry Point to server
const http = require('http');
const app = require('./server')

const port = process.env.PORT ||4253;


const server = http.createServer(app);


server.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 