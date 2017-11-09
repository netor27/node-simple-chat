var net = require('net');
var ClientSocket = require("./models/client_socket");

var client = new net.Socket();
var stdin = process.openStdin();

client.connect(8000, "localhost", function () {
	console.log("Connected!");
	new ClientSocket(client, stdin);
});