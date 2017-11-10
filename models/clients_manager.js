var assert = require("assert");
var util = require("util");
var EventEmitter = require("events").EventEmitter;
var _ = require("underscore")._;

var clientManager = function () {
    var clients = [];

    this.addClient = function (client) {
        assert(client, "Client must be initialized in order to add it to the manager");
        clients.push(client);
    };

    this.removeClient = function (client) {
        var index = _.indexOf(clients, client);
        clients.splice(index, 1);
    }

    this.getClientNames = function () {
        return clients.map(function (e) { return e.getClientName(); });
    };

    return this;
};


util.inherits(clientManager, EventEmitter);
module.exports = clientManager;