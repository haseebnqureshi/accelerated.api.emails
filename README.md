
## Usage
This module uses Postmark to deliver emails. As such, please register with http://postmarkapp.com and get your API token key. Then define the following in your accelerated.api ```env.json```:

```
"POSTMARK_API_TOKEN": "Postmark-API-Token",
"POSTMARK_FROM": "Postmark-From-Email-Address"
```

With accelerated.api, you define your own model. In your CommonJS model, use the ```models``` direct injected variable as such:

```
var toEmail = 'recipient@email.com';
var emailTemplate = ['onExample', __dirname]; 

/*
First value represents the dir where folder templates exists.
Second value represents the email template name that is used.
*/

models.emails.sendTo(toEmail, emailTemplate, {
	firstName: 'User' 
}, function(success) {
	console.log('Email sent!');
}, function(error) {
	console.log('Something went wrong!');
});

/*
In your emails module, where you're executing models.emails.sendTo,
create a folder "templates". 

For any new template, follow this file format in that "templates" folder:

project/
	|__ /index.js
	|__ /templates
		|__ /templateNameBody.html
		|__ /templateNameSubject.txt

In _Body.html and _Subject.txt files, use Mustache templating for rendering
any passed through data object properties.
*/

```

```

var api = require('accelerated.api');

var apiEmails = new require('acceleratd.api.emails')();

api.useModels([ 
	[apiEmails.key, apiEmails.model]
]);

api.run();

```
