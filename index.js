module.exports = (function() {

    //loading accelerated's module with your appropriate settings
    var module = new require('accelerated.api.module')({

        //set your module's key for reference by middlwares, models, and routes 
        key: 'emails',

        //set your module's name for logging output 
        name: 'Emails Module',

        //you can choose to extend your module's model
        extendModel: require('./model.js')

    });

    //returning for use by accelerated.api
    return module;

})();
