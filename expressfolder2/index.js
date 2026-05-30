const express=require("express");
const app=express();
const hostname="127.0.0.1";
const port=5000;
app.get("/",(req,res)=>{
    res.send("hello coder");
});

app.get("/about",(req,res)=>{
    res.send("<h2>this is the about page</h2>");
});



app.get("/user/:id",(req,res)=>{
    res.send(req.params);
});//this is the parameter used to check required data from the database

app.get("/user/:id/status/:status_id",(req,res)=>{
    res.send(req.params);
});

//http://127.0.0.1:5000/user/123/status/8965
//id:123,status_id:8965
app.get("/about-us",(req,res)=>{
   // res.status(200).json({
      //  user:"Aditya",
       // balance:"50000",
       // id:"this123"
   // });

    res.status(500).json({
    error:'something went wrong'
    });

});

app.get("/ab.*cd",(req,res)=>{
    res.send("<h1>i am the regex page.<h1>")
});

//this is the regex between ab and cd can be anything it will server the regex page


app.post("/login",(req,res)=>{
    res.send("login successfully");
});

app.get("/flights/:from-:to",(req,res)=>{
    res.send(req.params);
});

app.listen(port,hostname,()=>{
    console.log(`server is running at http://${hostname}:${port}/`);
})
