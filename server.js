const http = require('http');
const fs = require('fs');
const port = 3000;
const handlebars = require('handlebars');

http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    let html = fs.readFileSync('./src/index.html');
    let mainTemplate = handlebars.compile(html.toString());
    let context = { title: 'News Application with Node' };
    // html = html.toString().replace('{{title}}', 'News App in Node');
    res.write(mainTemplate(context));
    res.end();
}).listen(port, '127.0.0.1');

console.log('App is running in port ' + port);