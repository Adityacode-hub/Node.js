const express=require("express");
const multer=require("multer");
const app=express();
const hostname="127.0.0.1";
const port=process.env.PORT||5000;
//storage configuration

//const upload=multer({dest:"uploads/"});

const storage = multer.diskStorage({

    destination: function(req, file, cb) {

        cb(null, "uploads/");//in the upload folder

    },

    filename: function(req, file, cb) {

        cb(null, file.originalname);

    }

});
//middleware
const upload=multer({
    storage:storage
})
//const storage=multer.diskStorage({destination:function(req,res,cb)
//{
  //  cb(null,"uploads");
//}}),

//filename:function(req,file,cb){ cb(null,file.orgininalname)}}});



//upload route
//enctype="multipart/form-data thid is important
app.get("/upload",(req,res)=>{
    res.send(`
        <form action="/upload" method="POST" enctype="multipart/form-data">

   <input type="file" name="photo">

   <button type="submit">Upload</button>

</form>`
        )
})
;
app.post("/upload",upload.single("photo"),(req,res)=>{//here the name would be same as the input type
    console.log(req.file);
    res.send("file uploaded")
});

app.listen(port,hostname,()=>{
  console.log(  `Serving at the port http://${hostname}:${port}/`);
});
//this multer is used to upload the photo