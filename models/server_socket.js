var timeHelper = require("./helpers/time_helper")();
var assert = require("assert");

var serverSocket = function (socket, output) {
    assert(socket, "Server socket should be initialized!");
    assert(output, "Output should be initialized!");

    var logger = require("./helpers/logger")(output);

    this.processData = function (data) {
        var message = data.toString().trim();

        // log the message and send it back with a date
        logger.logMessage(message);
        writeMessageToSocket(message);
    };

    this.processEndConnection = function () {
        // log that a client disconnected
        logger.logMessage("Client disconnected");
    };

    this.processError = function (err) {
        // log that a client disconnected with an error
        logger.logMessage("Client disconnected with error " + err);
    };

    this.writeMessageToSocket = function (message) {
        socket.write(timeHelper.getCurrentTimeStamp() + message);
    };

    // wire the events
    socket.on('data', processData);
    socket.on('end', processEndConnection);
    socket.on('error', processError);

    // Log a new client and send a welcome message
    logger.logMessage("Client Connected!");
    writeMessageToSocket("Welcome!");

    return this;
};

module.exports = serverSocket;