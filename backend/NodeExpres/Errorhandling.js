// Errors are handled by one or more special middleware functions that have four arguments, 
// instead of the usual three: (err, req, res, next). For example:
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
