const server = require("net").createServer();
var ServerSocket = require("./models/server_socket");

server.on("connection", socket => {
    ServerSocket(socket);    
});

server.listen(8000, () => console.log('Server listening on port 8000...'));