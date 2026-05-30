const express = require("express");
const app = express();
const path=require("path");

const hostname = "127.0.0.1";

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {

    res.render("index");

});

//for setting the few things
//this is about where the template would be 
app.set("views", path.join(__dirname,"views"));
//kon sa use kr rahe ho like pug ,bootstrap,html

app.set("view engine","pug");



app.listen(port, hostname, () => {

    console.log(`server is running at http://${hostname}:${port}/`);

});
