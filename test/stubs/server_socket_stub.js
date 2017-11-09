
var serverSocketStub = function(){
    this.on = function(eventName, callback){
    };

    this.write = function(message){        
    };
}

module.exports = serverSocketStub;