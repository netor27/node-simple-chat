
var ClientSocket = function (socket, stdin) {

    this.writeData = function (data) {
        socket.write(data.toString().trim());
    };

    this.processInboundData = function (data) {
        console.log(data.toString().trim());
    };

    // wire the events
    stdin.on("data", this.writeData);
    socket.on('data', this.processInboundData);
    
    return this;
};

module.exports = ClientSocket;