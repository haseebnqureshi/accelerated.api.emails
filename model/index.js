module.exports = function(express, app, models) {

	/*------
	Dependencies
	------------*/

	var _ = require('underscore');
	var mustache = require('mustache');
	var postmark = require('postmark');
	var fs = require('fs');

	/*------
	Helpers
	------------*/

	var helpers = {

		emailParts: function(template, data) {
			return {
				body: this.renderTemplate(template, 'Body.html', data),
				subject: this.renderTemplate(template, 'Subject.txt', data)
			}
		},

		renderTemplate: function(template, typeAndExtension, data) {
			var dir = template[1];
			var filepath = dir + '/templates/' + template[0] + typeAndExtension;
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
			var email = helpers.emailParts(template, data);
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