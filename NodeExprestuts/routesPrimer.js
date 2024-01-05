// A route is a section of Express code that associates an HTTP verb (GET, POST, PUT, DELETE, etc.), a URL path/pattern, 
// and a function that is called to handle that pattern.

// Defining and using separate route modules:
// First we create routes for a wiki in a module named wiki.js. The code first imports the Express application 
// object, uses it to get a Router object and then adds a couple of routes to it using the get() method. 
// Last of all the module exports the Router object.
// wiki.js - Wiki route module.

const express = require("express");
const router = express.Router();

// Home page route.
router.get("/", function (req, res) {
    res.send("Wiki home page");
});

// About page route.
router.get("/about", function (req, res) {
    res.send("About this wiki");
});

module.exports = router;

// To use the router module in our main app file we first require() the route module (wiki.js). We then call use() 
// on the Express application to add the Router to the middleware handling path, specifying a URL path of 'wiki'.
const wiki = require("./wiki.js");

app.use("/wiki", wiki);




// Route functions:
// Our module above defines a couple of typical route functions. The "about" route (reproduced below) is defined 
// using the Router.get() method, which responds only to HTTP GET requests. The first argument to this method is 
// the URL path while the second is a callback function that will be invoked if an HTTP GET request with the 
// path is received.

router.get("/about", function (req, res) {
    res.send("About this wiki");
});
// The callback takes three arguments (usually named as shown: req, res, next), that will contain the HTTP Request 
// object, HTTP response, and the next function in the middleware chain.

// The callback function here calls send() on the response to return the string "About this wiki" when we receive 
// a GET request with the path ('/about'). There are a number of other response methods for 
// ending the request/response cycle. 




// HTTP verbs:
// The Router also provides route methods for all the other HTTP verbs, that are mostly used in exactly the same 
// way: post(), put(), delete(), options(), trace(), copy(), lock(), mkcol(), move(), purge(), propfind(), proppatch(), 
// unlock(), report(), mkactivity(), checkout(), merge(), m-search(), notify(), subscribe(), unsubscribe(), patch(), search(), and connect().

// For example, the code below behaves just like the previous /about route, but only responds to HTTP POST requests.
router.post("/about", (req, res) => {
    res.send("About this wiki");
});



// Route paths:
// The route paths define the endpoints at which requests can be made. The examples we've seen so far have just 
// been strings, and are used exactly as written: '/', '/about'. 
// Route paths can also be string patterns. String patterns use a form of regular expression syntax to define patterns 
// of endpoints that will be matched. The syntax is listed below (note that the hyphen (-) and the dot (.) are interpreted 
// literally by string-based paths):
// ? : The endpoint must have 0 or 1 of the preceding character (or group), e.g. a route path of '/ab?cd' will match endpoints acd or abcd.
// + : The endpoint must have 1 or more of the preceding character (or group), e.g. a route path of '/ab+cd' will match endpoints abcd, abbcd, abbbcd, and so on.
// * : The endpoint may have an arbitrary string where the * character is placed. E.g. a route path of '/ab*cd' will match endpoints abcd, abXcd, abSOMErandomTEXTcd, and so on.
// () : Grouping match on a set of characters to perform another operation on, e.g. '/ab(cd)?e' will perform a ?-match on the group (cd) — it will match abe and abcde.

// The route paths can also be JavaScript regular expressions. For example,
app.get(/.*fish$/, function (req, res) {
    // …
});




// Route parameters:
// Route parameters are named URL segments used to capture values at specific positions in the URL. The named 
// segments are prefixed with a colon and then the name (E.g., /:your_parameter_name/). The captured values are 
// stored in the req.params object using the parameter names as keys (E.g., req.params.your_parameter_name).

// So for example, consider a URL encoded to contain information about users and books: http://localhost:3000/users/34/books/8989. 
// We can extract this information as shown below, with the userId and bookId path parameters:
app.get("/users/:userId/books/:bookId", (req, res) => {
    // Access userId via: req.params.userId
    // Access bookId via: req.params.bookId
    res.send(req.params);
});




// Handling errors in the route functions:
/*
The route functions shown earlier all have arguments req and res, which represent the request and response, 
respectively. Route functions are also called with a third argument next, which can be used to pass errors to 
the Express middleware chain.

The code below shows how this works, using the example of a database query that takes a callback function, 
and returns either an error err or some results. If err is returned, next is called with err as the value in 
its first parameter (eventually the error propagates to our global error handling code). On success 
the desired data is returned and then used in the response.
*/
router.get("/about", (req, res, next) => {
    About.find({}).exec((err, queryResults) => {
        if (err) {
            return next(err);
        }
        //Successful, so render
        res.render("about_view", { title: "About", list: queryResults });
    });
});



// Handling exceptions in route functions:
/*
The previous section shows how Express expects route functions to return errors. The framework is designed for 
use with asynchronous functions that take a callback function (with an error and result argument), which is called 
when the operation completes. That's a problem because later on we will be making Mongoose database queries that use 
Promise-based APIs, and which may throw exceptions in our route functions (rather than returning errors in a callback).
*/
exports.get("/about", async function (req, res, next) {
    try {
        const successfulResult = await About.find({}).exec();
        res.render("about_view", { title: "About", list: successfulResult });
    } catch (error) {
        return next(error);
    }
});
/*
That's quite a lot of boilerplate code to add to every function. Instead, for this tutorial we'll use the 
express-async-handler module. This defines a wrapper function that hides the try...catch block and the code 
to forward the error. The same example is now very simple, because we only need to write code for the case 
where we assume success:
*/
// Import the module
const asyncHandler = require("express-async-handler");

exports.get(
    "/about",
    asyncHandler(async (req, res, next) => {
        const successfulResult = await About.find({}).exec();
        res.render("about_view", { title: "About", list: successfulResult });
    }),
);
