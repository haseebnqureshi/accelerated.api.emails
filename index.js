module.exports = (function() {

    // you can require this or other modules using accelerated.api.module 
    var module = require('accelerated.api.module');
    
    // set your module's key for reference by middlwares, models, and routes 
    module.setKey('emails');

    // set your module's name for logging output 
    module.setName('Emails Module');

    // you can choose to extend your module's model
    module.extendModel(function(model, express, app, models) {

    	// choosing to keep model isolated into another commonjs module
		model = require('./model.js')(model, express, app, models);    	

        // modify model to include user create, retrieve, update, and delete methods
        return model;

    });

    return module;

})();