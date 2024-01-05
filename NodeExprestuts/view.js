// Template engines (also referred to as "view engines" by Express's documentation) allow you to specify the 
// structure of an output document in a template, using placeholders for data that will be filled in when a page is generated. 
// Templates are often used to create HTML, but can also create other types of documents.

// In your application settings code you set the template engine to use and the location where Express should look for templates 
// using the 'views' and 'view engine' settings, as shown below (you will also have to install the package containing your template library too!)

const express = require("express");
const path = require("path");
const app = express();

// Set directory to contain the templates ('views')
app.set("views", path.join(__dirname, "views"));

// Set view engine to use, in this case 'some_template_engine_name'
app.set("view engine", "some_template_engine_name");

// The appearance of the template will depend on what engine you use. Assuming that you have a template file 
// named "index.<template_extension>" that contains placeholders for data variables named 'title' and "message", 
// you would call Response.render() in a route handler function to create and send the HTML response:

// send the rendered view to the client
res.render('index')

// if a callback is specified, the rendered HTML string has to be sent explicitly
res.render('index', function (err, html) {
  res.send(html)
})

// pass a local variable to the view
res.render('user', { name: 'Tobi' }, function (err, html) {

})