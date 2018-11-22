var express = require('express');
var app = express();
var start = new Date();
var bodyParser = require('body-parser');
var responseTime = require('response-time');

//process
//---------------------------------------------------------------------------------------------------
 function random(low, high) {
   return Math.random() * (high - low) + low;
}
app.get('/process', function (req, res) {
	setTimeout(function(){
		 res.json({ time : new Date(), method : 'GET' , path : '/process' , headers : req.headers ,
				query : req.query , duration : (random(15000,30000)/1000).toString()+"sec"});
	},random(15000,30000))
})

app.use(bodyParser.json()); // support json encoded bodies

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/process', function(req, res){
	setTimeout(function(){
		 res.json({ time : new Date(), method : 'POST' , path : '/process' , headers : req.headers ,
				query : req.query , body:req.body , duration : (random(15000,30000)/1000).toString()+"sec"});
	},random(15000,30000))
})

app.put('/process', function(req, res){
	setTimeout(function(){
		 res.json({ time : new Date(), method : 'PUT' , path : '/process' , headers : req.headers ,
				query : req.query , body:req.body , duration : (random(15000,30000)/1000).toString()+"sec"});
	},random(15000,30000))
})

app.delete('/process', function(req, res){
	setTimeout(function(){
		 res.json({ time : new Date(), method : 'DELETE' , path : '/process' , headers : req.headers ,
				query : req.query , body:req.body , duration : (random(15000,30000)/1000).toString()+"sec"});
	},random(15000,30000))
})

//----------------------------------------------------------------------------------------------------

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port);
})