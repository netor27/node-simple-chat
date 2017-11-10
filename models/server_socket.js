var timeHelper = require("./helpers/time_helper")();
var assert = require("assert");
const uuidv1 = require('uuid/v1');

var serverSocket = function (socket, output, manager) {
    assert(socket, "Server socket should be initialized!");
    assert(output, "Output should be initialized!");
    assert(manager, "Manager should be initialized!");

    var self = this;
    var clientName = null;
    var clientId = uuidv1();

    manager.addClient(self);

    this.processData = function (data) {
        var message = data.toString().trim();

        if (message == "/list") {
            self.writeMessageToSocket({
                message: manager.getClientNames().join(","),
                clientName: ""
            });
        } else if (!clientName) {
            // set the client name with the first message.
            self.writeMessageToSocket({
                message: "Hello " + message,
                clientName: ""
            });
            clientName = message;
        } else {
            // broadcast the message to the other clients
            manager.emit("broadcast", {
                message: message,
                clientId: clientId,
                clientName: clientName
            });
        }
    };

    this.processEndConnection = function () {
        // log that a client disconnected
        output.log(timeHelper.getCurrentTimeStamp() + " Client disconnected");
        manager.removeClient(self);
    };

    this.processError = function (err) {
        // log that a client disconnected with an error
        output.log(timeHelper.getCurrentTimeStamp() + " Client disconnected with error " + err);
        manager.removeClient(self);
    };

    this.writeMessageToSocket = function (messageObject) {
        if (messageObject.clientId != clientId) {
            socket.write(timeHelper.getCurrentTimeStamp() + " " + messageObject.clientName + ": " + messageObject.message);
        }


    };

    this.getClientName = function () {
        return clientName ? clientName : "";
    };

    // wire the events
    socket.on('data', function (data) { self.processData(data); });
    socket.on('end', function () { self.processEndConnection(); });
    socket.on('error', function (err) { self.processError(err); });

    manager.on("broadcast", function (messageObject) { self.writeMessageToSocket(messageObject); });

    // Log a new client and send a welcome message
    output.log(timeHelper.getCurrentTimeStamp() + " Client Connected!");
    self.writeMessageToSocket(
        {
            message: "Welcome!, please send your name..",
            clientName: ""
        });

    return this;
};

module.exports = serverSocket;