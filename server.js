const express = require('express');


//Start App
const app = express();


//Server port
let portNum = 3004;
const port = process.env.PORT || portNum;

//Start Server
let server = (port, function(req,res){
    console.log('Server listening to port', portNum);
});