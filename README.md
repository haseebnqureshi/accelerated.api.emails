
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

appEmails/
	---index.js
	---templates/
		---templateNameBody.html
		---templateNameSubject.txt

In _Body.html and _Subject.txt files, use Mustache templating for rendering
any passed through data object properties.
*/

```

## Quick Start
This repo is an easy-to-use npm template to create modules for accelerated.api. Simply clone this repo and:

1. Change your ```moduleKey``` and ```moduleName``` in index.js. (```moduleKey``` is a key that uniquely identies your module in the context of your app.)

2. Update your ```package.json``` with your information and module information.

3. Now actually create your module by utilizing the three CommonJS modules in this repo, ```middleware```, ```model```, and ```route```. Please note the structure and direct injected variables in each CommonJS module and what each is returning.

4. Run ```npm publish``` in your command line to publish directly onto npm, and viola! You've got a npm packaged module for accelerated.api.

## Using in accelerated.api
Okay, so how do you use this module in your accelerated.api project? Here's an example:

```

var api = require('accelerated.api');

var example = require('acceleratd.api.module');

api.useMiddlewares([ 
	[example.key, example.middleware]
]);

api.useModels([
	[example.key, example.model]
]);

api.useRoutes([
	[example.key, example.route]
]);

api.run();

```
