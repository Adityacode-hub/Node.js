//method to create route
const express=require("express");
const app=express();
const hostname="127.0.0.1";
const port=3000;

app.get("/",(req,res)=>{
    res.send("hello coder");
});

app.get("/about",(req,res)=>{
    res.send("<h1> This is the about page</h1>");

});
 app.post("/login",(req,res)=>{
    res.send("login success")
 });//this will not work because it work on the form only

 app.delete("/remove",(req,res)=>{
    res.send("data deleted successfully");
 })
app.listen(port,hostname,()=>{
    console.log(`server is running at http://${hostname}:${port}/`);
})