const UserList = ['Paul','Dean'];
const fs = require('fs');
var path = require('path');

const APINavigation = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/' && method === 'GET') {
        return ReadHtmlFile('./index.html', res);
    } else if (url === '/users' && method === 'GET') {
        res.setHeader('Content-Type','text/html');
        res.statusCode = 200;
        res.write('<html>');
        res.write('<header><title>User list</title></header>');
        res.write('<body><h3>User list</h3>');
        res.write('<a href="/">Back</a>');
        res.write('<form action="/create-user" method="POST"><input type="text" placeholder="Username" name="username"><button type="submit">Create</button></form>');
        res.write('<ul>');
        UserList.forEach(element => {
            res.write(`<li>${element}</li>`);
        });
       
        res.write('</body></html>');  
        return res.end();
    } else if (url === '/create-user' && method === 'POST') {
        
        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);    
        }) 

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const NewUserName = parsedBody.split('=')[1];
            UserList.push(NewUserName);
            console.log(NewUserName);

            res.statusCode = 302;
            res.setHeader('Location','/users');  
            return res.end();           
        })
        
    } else {
        res.statusCode = 404;
        return res.end();
    }
}

function ReadHtmlFile(FilePath, response) {
    fs.readFile(FilePath, (err, data) => {
        if (err) {
            if (error.code == 'ENOENT') {
                response.statusCode = 404;
                return response.end();
            } else {
                response.writeHead(500);
                return response.end('Internal server error: ' + error.code + ' ..\n');
            }
        } else {
            response.statusCode = 200;
            return response.end(data, 'UTF-8');
        }
    });
}

module.exports.APINavigation = APINavigation;
module.exports.UserList = UserList;