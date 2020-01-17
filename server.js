var express = require('express'),
    path = require('path');
//
var app = express();

app.use(express.static(path.join(__dirname,'public')));

app.use('/', function(req,res){
    res.sendFile('./public/views/main.html', {root: __dirname});
});

//Port
var portNum = 3004;
var port = process.env.PORT || portNum;


//Server start
var server = app.listen(port, function(){
    console.log('Server listening to port ', portNum);
});