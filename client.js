var client = new require("net").Socket();
var ClientSocket = require("./models/client_socket");

client.connect(8000, "localhost", function () {
	console.log("Connected!");
	new ClientSocket(client, process.openStdin());
});