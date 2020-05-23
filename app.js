const http = require('http');
const APINav = require('./routes');

console.log('Server started. To stop press Ctrl+C.')

const server = http.createServer(APINav.APINavigation);

server.listen(3000);
