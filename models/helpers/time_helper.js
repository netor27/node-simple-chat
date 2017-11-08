var moment = require("moment");

var TimeHelper = function(){
    this.getCurrentTimeStamp = function () {
        return moment().format("DD/MM/YYYY hh:mm:ss") + " -- ";
    };

    return {
        getCurrentTimeStamp: getCurrentTimeStamp
    };
};

module.exports = TimeHelper;