const server = require("net").createServer();
var ChatSocket = require("./models/chat_socket");

server.on("connection", socket => {
    new ChatSocket(socket);    
});

server.listen(8000, () => console.log('Server listening on port 8000...'));