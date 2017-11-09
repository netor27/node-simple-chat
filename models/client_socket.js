
var ClientSocket = function (socket, stdin) {

    this.writeData = function (data) {
        socket.write(data.toString().trim());
    };

    this.processInboundData = function (data) {
        console.log(data.toString().trim());
    };

    stdin.addListener("data", this.writeData);
    socket.on('data', this.processInboundData);
    return this;
};

module.exports = ClientSocket;