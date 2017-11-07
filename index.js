var moment = require("moment");
const server = require("net").createServer();

var endOfLine = "\r\n";

var getCurrentTimeStamp = function(){
    return moment().format("DD/MM/YYYY hh:mm:ss") + " -- ";
};

server.on("connection", socket => {
    console.log(getCurrentTimeStamp() + "Client Connected");
    socket.write(getCurrentTimeStamp() + "Welcome!");

    var buffer = [];
    socket.on('data', data => {
        // buffer the data 
        buffer.push(data); 
        
        if(data.indexOf(endOfLine) !== -1){
            // If we receive an end of line, write it to console and to the client
            var bufferString = buffer.join("");            
            console.log(getCurrentTimeStamp() + bufferString);
            socket.write(getCurrentTimeStamp() + bufferString);

            //  empty the buffer and
            buffer = [];
        }
    });

    socket.on('end', () => {
        // log that a client disconnected
        console.log(getCurrentTimeStamp()+"Client disconnected");
    });
});

server.listen(8000, () => console.log('Server listening on port 8000...'));