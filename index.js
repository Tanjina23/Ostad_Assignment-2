var http = require('http');
var fs = require('fs')
var multer = require('multer');

// Multer disk storage for file uploading
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); // upload directory
    },
    filename: (req, file, cb) => {
      cb(null,file.originalname);
    },
  });
  const upload = multer({ storage: storage });

  // Creating Server
var server = http.createServer(function(req,res){
    if(req.url=='/'){
        res.writeHead(200,{'Content-Type' : 'text/html'});
        res.write('<h1>This is Home Page</h1>');
        res.end();
    }
   else if(req.url=='/about'){
        res.writeHead(200,{'Content-Type' : 'text/html'});
        res.write('<h1>This is About Page</h1>');
        res.end();
    }
   else if(req.url=='/contact'){
        res.writeHead(200,{'Content-Type' : 'text/html'});
        res.write('<h1>This is Contact Page</h1>');
        res.end();
    }

    else if(req.url == '/file-write'){
        fs.writeFile('demo.txt','Hello World',function(error){
            if(error){
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write("<h1>File Write Fail</h1>");
            res.end();
            }
            else{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write("<h1>File Write Successfully Done</h1>");
            res.end();
            }
        })
    }

    //Uploading File
    else {
      if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
         handleFileUpload(req, res);
      } }
})

//Uploading File
const handleFileUpload = (req,res)=>{
    upload.single('myfile')(req,res,(err)=>{
      if(err){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("<h1>File Upload Fail</h1>");
        res.end();
      }else{
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("<h1>File Uploaded Successfully</h1>");
        res.end();
      }
    })
  }
//Server listening Port
server.listen(5500,function(){
    console.log("Server Run Successfully");
})