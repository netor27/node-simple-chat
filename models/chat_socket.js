
var moment = require("moment");
const endOfLine = "\r\n";

var getCurrentTimeStamp = function () {
    return moment().format("DD/MM/YYYY hh:mm:ss") + " -- ";
};

var chatSocket = function (serverSocket) {
    if (!serverSocket) {
        throw "Server socket should be initialized";
    }

    console.log(getCurrentTimeStamp() + "Client Connected");
    serverSocket.write(getCurrentTimeStamp() + "Welcome!");

    var buffer = [];
    serverSocket.on('data', data => {
        // buffer the data 
        buffer.push(data);
        console.log(data.toString().trim());

        if (data.indexOf(endOfLine) !== -1) {
            // If we receive an end of line, write it to console and to the client
            var bufferString = buffer.join("");
            console.log(getCurrentTimeStamp() + bufferString);
            serverSocket.write(getCurrentTimeStamp() + bufferString);
            emit("")
            //  empty the buffer and
            buffer = [];
        }
    });

    serverSocket.on('end', () => {
        // log that a client disconnected
        console.log(getCurrentTimeStamp() + "Client disconnected");
    });
};

module.exports = chatSocket;