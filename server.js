const express = require('express');

//Start App
const app = express();

//Server port
let portNum = 3004;
let port = process.env.PORT || portNum;

app.get('/', function(req,res){
    res.sendFile("/Users/adarsh/Desktop/GitHub Projects/Template-OnePage/modules/app/client/view/home.html");
});

app.get('*', function(req, res){
    res.send('404 Error');
});

//Start Server
let server = app.listen(port, function(req,res){
    console.log('Server listening to port', portNum);
});