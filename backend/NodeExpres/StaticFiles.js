// You can use the express.static middleware to serve static files, including your images, CSS and JavaScript (static() is the only middleware function that is actually part of Express).
app.use(express.static("public"));

// Any files in the public directory are served by adding their filename (relative to the base "public" directory) to the base URL. So for example:

// http://localhost:3000/images/dog.jpg
// http://localhost:3000/css/style.css

// You can call static() multiple times to serve multiple directories. If a file cannot be found by one middleware function then it will be passed on to the subsequent middleware 
// (the order that middleware is called is based on your declaration order).
app.use(express.static("public"));
app.use(express.static("media"));

// You can also create a virtual prefix for your static URLs, rather than having the files added to the base URL.
app.use("/media", express.static("public"));

