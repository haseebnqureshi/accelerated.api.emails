module.exports = function(model, express, app, models, settings) {

	/*------
	Dependencies
	------------*/

	var mustache = require('mustache');
	var postmark = require('postmark');
	var fs = require('fs');
	var path = require('path');

	/*------
	Helpers
	------------*/

	var helpers = {

		getEmailParts: function(template, data) {
			return {
				body: this.renderTemplate(template, 'Body.html', data),
				subject: this.renderTemplate(template, 'Subject.txt', data)
			}
		},

		getTemplateFilepath: function(template, typeAndExtension) {
			var dirpath = template[1];
			var basename = template[0] + typeAndExtension;
			var filepath = path.join(dirpath, 'templates', basename);
			return filepath;
		},

		renderTemplate: function(template, typeAndExtension, data) {
			var filepath = this.getTemplateFilepath(template, typeAndExtension);
			var contents = fs.readFileSync(filepath, 'utf8');
			var rendered = mustache.render(contents, data);
			return rendered;
		}

	};

	/*------
	Defining Model
	------------*/

	var Model = {

		sendTo: function(to, template, data, successCallback, errorCallback) {
			
			var email = helpers.getEmailParts(template, data);
			
			var client = new postmark.Client(process.env.POSTMARK_API_TOKEN);
			
			client.sendEmail({
				From: process.env.POSTMARK_FROM,
				To: to,
				Subject: email.subject,
				HtmlBody: email.body
			}, function(err, success) {
				if (err && errorCallback) { return errorCallback(err); }
				if (successCallback) { return successCallback(success); }
			});

		}

	};

	/*------
	Returning Model
	------------*/

	return Model;

};
