const express=require("express");
const app=express();
const hostname="127.0.0.1";
const port=5000;
//any thing that run between req and response is the middleware
var myconsolelog=function(req,res,next)
{
    console.log("i am  middleware");
    next();
};
//this is the arrow function 
const middleware=(req,res,next)=>{
    console.log("this is the another middleware");
    next();
}

//this will work first and then after that another get request will work
app.use(myconsolelog);
app.use(middleware);


app.get("/",(req,res)=>{
    res.send("hello coder");
    console.log("hello world from /")
});

app.get("/about-us",(req,res)=>{
    res.status(500).json({
        error:"something went wrong"
    })
});

app.get("/user/:id/status/:status_id",(req,res)=>{
    res.send(req.params);
});


//no need to write the app,use because we are using it directly

app.get(
  '/user/:id',
  (req, res, next) => {
    console.log('ID:', req.params.id);
    next();
  },
  (req, res, next) => {
    res.send('User Info');
  }
);

// handler for the /user/:id path, which prints the user ID
app.get('/use/:id', (req, res, next) => {
  res.send(req.params.id);
});

app.get("/ab.*cd",(req,res)=>{
    res.send("this is the regex page");
});

app.get("/login",(req,res)=>{
    res.send("login successful");
});


app.get("/flights/:from-:to",(req,res)=>{
    res.send(req.params);
});

//another method of using the id

app.get("/users/:id",(req,res,next)=>{
    res.send("users");
});

app.use("/users/:id",(req,res,next)=>{
    console.log("request url",req.originalUrl);
    next();
},

(req,res,next)=>{
    console.log("request type",req.method);
    next();
}

)

app.listen(port,hostname,()=>{
    console.log(`server is running at http://${hostname}:${port}/`);
})



