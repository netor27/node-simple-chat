var assert = require("assert");

var clientSocket = function (socket, stdin, output) {
    assert(socket, "Server socket should be initialized!");
    assert(stdin, "stdin should be initialized!");
    assert(output, "Output should be initialized!");

    var self = this;

    this.writeData = function (data) {
        var message = data.toString().trim();
        if (message == "/quit") {
            socket.destroy();
            output.log("Successfully disconnected from server.");
            process.exit();
         } else {
            socket.write(message);
        }
    };

    this.processInboundData = function (data) {
        output.log(data.toString().trim());
    };

    this.processError = function (err) {
        output.log("Server connection lost...");
    };

    // wire the events
    stdin.on("data", function (data) { self.writeData(data); });
    socket.on("data", function (data) { self.processInboundData(data); });
    socket.on("error", function (err) { self.processError(err) });

    return this;
};

module.exports = clientSocket;