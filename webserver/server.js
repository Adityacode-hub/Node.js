  const http =require("http");
  const hostname="127.0.0.1";
  const port=5000;

  http.createServer((req,res)=>{
    res.writeHead(200,{'content-type':'text/plain'});//status code and response header is plain text
    res.end("hello coder");//sends final response data
    //ends the response

  }).listen(port,hostname,()=>{
    console.log(`server is running at http://${hostname}:${port}/`);
  })


  //client request
  //server recieve the request
  // writehead() ->send status + header
  //end() ->send data +finish response
