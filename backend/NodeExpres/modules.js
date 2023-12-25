//Importing and creating modules

// A module is a JavaScript library / file that you can import into other code using Node's require() function. Express itself is a module, as are the middleware and database libraries that we use in our Express applications.
// eg. 
const express = require("express");
const app = express();

// To make objects available outside of a module you just need to expose them as additional properties on the exports object. For example, the square.js module below is a file that exports area() and perimeter() methods:
exports.area = function (width) {
    return width * width;
};
exports.perimeter = function (width) {
    return 4 * width;
};

// We can import this module using require(), and then call the exported method(s) as shown:
const square = require("./square"); // Here we require() the name of the file without the (optional) .js file extension
console.log(`The area of a square with a width of 4 is ${square.area(4)}`);

// If you want to export a complete object in one assignment instead of building it one property at a time, assign it to module.exports as shown below (you can also do this to make the root of the exports object a constructor or other function):
module.exports = {
    area(width) {
        return width * width;
    },

    perimeter(width) {
        return 4 * width;
    },
};
