var timeHelper = require("./helpers/time_helper")();
var assert = require("assert");

var serverSocket = function (socket, output, manager) {
    assert(socket, "Server socket should be initialized!");
    assert(output, "Output should be initialized!");
    assert(manager, "Manager should be initialized!");

    var self = this;
    var clientName = null;

    manager.addClient(self);

    this.processData = function (data) {
        var message = data.toString().trim();

        if (message == "/list") {
            self.writeMessageToSocket(manager.getClientNames().join(","));
        } else if (!clientName) {
            // set the client name with the first message.
            self.writeMessageToSocket("Hello " + message);
            clientName = message;
        } else {
            // log the message and send it back            
            self.writeMessageToSocket(message);
        }
    };

    this.processEndConnection = function () {
        // log that a client disconnected
        output.log(timeHelper.getCurrentTimeStamp() + " Client disconnected");
    };

    this.processError = function (err) {
        // log that a client disconnected with an error
        output.log(timeHelper.getCurrentTimeStamp() + " Client disconnected with error " + err);
    };

    this.writeMessageToSocket = function (message) {
        socket.write(timeHelper.getCurrentTimeStamp() + " " + self.getClientName() + ": " + message);
    };

    this.getClientName = function () {
        return clientName ? clientName : "";
    };

    // wire the events
    socket.on('data', function (data) { self.processData(data); });
    socket.on('end', function () { self.processEndConnection(); });
    socket.on('error', function (err) { self.processError(err); });

    //manager.on()

    // Log a new client and send a welcome message
    output.log(timeHelper.getCurrentTimeStamp() + " Client Connected!");
    self.writeMessageToSocket("Welcome!, please send your name..");

    return this;
};

module.exports = serverSocket;