const server = require("net").createServer();
var ServerSocket = require("./models/server_socket");
var ClientManager = require("./models/clients_manager");

var manager = new ClientManager();

server.on("connection", socket => {
    new ServerSocket(socket, console, manager);    
});

server.listen(8000, () => console.log('Server listening on port 8000...'));