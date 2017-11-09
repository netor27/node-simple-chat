var client = new require("net").Socket();
var ClientSocket = require("./models/client_socket");
var a = null;
client.connect(8000, "localhost", function () {
	console.log("Connected!");
	a = new ClientSocket(client, process.openStdin(), console);
});