// Adapted from: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework
const http = require('http');
const fs = require('fs');
const path = require('path');

module.exports = class Server{
  constructor(port){
    this.port = port || 8000;
    this.server = undefined;
  }

  get pid(){
    return process.pid;
  }

  start(){
    this.server = http.createServer(function (request, response) {
      let filePath = '.' + request.url;
      if(filePath.endsWith('/')) {
        filePath += 'index.html';
      }
      if(fs.lstatSync(filePath).isDirectory()){
        filePath += '/index.html';
      }

      const extname = String(path.extname(filePath)).toLowerCase();
      const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.mp3': 'audio/mpeg'
      };

      const contentType = mimeTypes[extname] || 'application/octet-stream';

      fs.readFile(filePath, function(error, content) {
        if(error) {
          if(error.code == 'ENOENT') {
            response.writeHead(404);
            response.end(`File not found: ${error.code}\n`);
          } else {
            response.writeHead(500);
            response.end(`Error: ${error.code}\n`);
          }
          response.end();
        } else {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        }
      });

    });

    this.server.listen(this.port);
    console.log(`Server running at http://127.0.0.1:${this.port}/`);
    console.log(`PID: ${this.pid}`);
  }

  stop(){
    this.server.close( () => {
      console.log('Server stopped');
    });
  }
}

// process.kill(process.pid, 'SIGTERM')

// process.on('SIGTERM', () => {
// );
