
/*
Express is the most popular Node web framework,
It provides mechanisms to:

Write handlers for requests with different HTTP verbs at different URL paths (routes).
*Integrate with "view" rendering engines in order to generate responses by inserting data into templates.
*Set common web application settings like the port to use for connecting, and the location of templates that are used for rendering the response.
*Add additional request processing "middleware" at any point within the request handling pipeline.

While Express itself is fairly minimalist, developers have created compatible middleware packages to address almost any web development problem. 
*/
const express = require("express");
const app = express();
const port = 3000;

app.get("/", function (req, res) {
    res.send("Hello World!");
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

/*
The first two lines require()(import ) the express module and create an Express application.This object, which is traditionally named app, has methods for routing HTTP requests, configuring middleware, rendering HTML views, registering a template engine, and modifying application settings.

The middle part of the code(the three lines starting with app.get) shows a route definition.The app.get() method specifies a callback function that will be invoked whenever there is an HTTP GET request with a path('/') relative to the site root.The callback function takes a request and a response object as arguments, and calls send().

The final block starts up the server on a specified port ('3000') and prints a log comment to the console. With the server running, you could go to localhost:3000 in your browser to see the example response returned.
*/