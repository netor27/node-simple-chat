var timeHelper = require("./time_helper")();
var Logger = function(output){

    this.logMessage = function(message){
        output.log(timeHelper.getCurrentTimeStamp() + message);
    };

    return {
        logMessage : logMessage
    };
};

module.exports = Logger;