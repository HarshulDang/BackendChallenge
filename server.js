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

//stats

//----------------------------------------------------------------------------------------------------
var requests = [];
var requestTrimThreshold = 5000;
var requestTrimSize = 4000;

app.all("/stats", function(req, res, next) {
	requests.push(Date.now());

    // now keep requests array from growing forever
    if (requests.length > requestTrimThreshold) {
        requests = requests.slice(0, requests.length - requestTrimSize);
    }
    next();

    req.start = Date.now();
    next();

    var time = Date.now() - req.start;
    var now = Date.now();
    var aSecAgo = now - 1000;
    var secCnt = 0;
    // since recent requests are at the end of the array, search the array
    // from back to front
    for (var i = requests.length - 1; i >= 0; i--) {
        if (requests[i] >= aSecAgo) {
            ++secCnt;
        } else {
            break;
        }
    }
//----------------------------------------------------------------------------------------------------

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port);
})