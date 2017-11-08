var timeHelper = require("./time_helper")();
var Logger = function(){

    this.logMessage = function(message){
        console.log(timeHelper.getCurrentTimeStamp() + message);
    };

    return {
        logMessage : logMessage
    };
};

module.exports = Logger;