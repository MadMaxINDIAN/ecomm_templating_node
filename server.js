const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

// Router files
const product = require("./router/product");
const users = require("./router/users");
const cart = require("./router/cart");

// Initialising app
const app = express();

// Setting bodyParser
app.use(bodyParser.urlencoded({extended : true}))

// Initialising router
app.use("/api/product",product);
app.use("/api/users",users);
app.use("/api/cart",cart);

app.get("/",(req,res) => {
    res.send("hello")
});

// Initialisin port
port = process.env.PORT || 5000;

app.listen(port, (req,res) => {
    console.log("Server is running on port " + port);
    
})