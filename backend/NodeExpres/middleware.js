// middleware functions typically perform some operation on the request or response and then call the next 
// function in the "stack", which might be more middleware or a route handler.The order in which middleware 
// is called is up to the app developer.

// To use third party middleware you first need to install it into your app using npm. For example, to install 
// the morgan HTTP request logger middleware, you'd do this:
// npm install morgan
// You could then call use() on the Express application object to add the middleware to the stack:
const express = require("express");
const logger = require("morgan");
const app = express();
app.use(logger("dev"));

/*
You can write your own middleware functions, and you are likely to have to do so (if only to create error 
handling code). The only difference between a middleware function and a route handler callback is that 
middleware functions have a third argument next, which middleware functions are expected to call if they 
are not that which completes the request cycle (when the middleware function is called, this contains the 
next function that must be called).

You can add a middleware function to the processing chain for all responses with app.use(), or for a specific 
HTTP verb using the associated method: app.get(), app.post(), etc. Routes are specified in the same way for 
both cases, though the route is optional when calling app.use().

The example below shows how you can add the middleware function using both approaches, and with/without a route.
*/
const express = require("express");
const app = express();

// An example middleware function
const a_middleware_function = function (req, res, next) {
    // Perform some operations
    next(); // Call next() so Express will call the next middleware function in the chain.
};

// Function added with use() for all routes and verbs
app.use(a_middleware_function);

// Function added with use() for a specific route
app.use("/someroute", a_middleware_function);

// A middleware function added for a specific HTTP verb and route
app.get("/", a_middleware_function);

app.listen(3000);
