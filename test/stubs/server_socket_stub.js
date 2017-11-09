var util = require("util");
var EventEmitter = require("events").EventEmitter;

var serverSocketStub = function(){
    this.write = function(message){        
    };
}

util.inherits(serverSocketStub, EventEmitter);


module.exports = serverSocketStub;