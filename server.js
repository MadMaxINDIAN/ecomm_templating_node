const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const database = "ecomm_templatingDB"

// Connecting mongoose
mongoose.connect("mongodb+srv://admin-naman:20010922@madmaxindian-mttom.mongodb.net/" + database,{ useNewUrlParser: true,useUnifiedTopology: true },() => console.log("MongoDB connected"))

// Router files
const product = require("./router/product");
const users = require("./router/users");
// const cart = require("./router/cart");
const admin = require("./router/admin");
const order = require("./router/order");
const manager = require("./router/manager");

// Initialising app
const app = express();

// Setting bodyParser
app.use(bodyParser.urlencoded({extended : true}))

// Parsing JSON
app.use(express.json());

// Initialising router
app.use("/api/product/",product);
app.use("/api/users/",users);
// app.use("/api/cart/",cart);
app.use("/api/order/",order)
app.use("/api/admin/",admin)
app.use("/api/manager/",manager)

app.get("/",(req,res) => {
    res.send("hello")
});

// Initialisin port
port = process.env.PORT || 5000;

app.listen(port, (req,res) => {
    console.log("Server is running on port " + port);
});