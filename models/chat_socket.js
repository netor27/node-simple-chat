
var timeHelper = require("./helpers/time_helper")();
const endOfLine = "\r\n";

var chatSocket = function (serverSocket) {
    if (!serverSocket) {
        throw "Server socket should be initialized";
    }

    console.log(timeHelper.getCurrentTimeStamp() + "Client Connected");
    serverSocket.write(timeHelper.getCurrentTimeStamp() + "Welcome!");

    var buffer = [];
    serverSocket.on('data', data => { 
        // buffer the data 
        buffer.push(data);
        console.log(data.toString().trim());

        if (data.indexOf(endOfLine) !== -1) {
            // If we receive an end of line, write it to console and to the client
            var bufferString = buffer.join("");
            console.log(timeHelper.getCurrentTimeStamp() + bufferString);
            serverSocket.write(timeHelper.getCurrentTimeStamp() + bufferString);
            emit("")
            //  empty the buffer and
            buffer = [];
        }
    });

    serverSocket.on('end', () => {
        // log that a client disconnected
        console.log(timeHelper.getCurrentTimeStamp() + "Client disconnected");
    });
};

module.exports = chatSocket;