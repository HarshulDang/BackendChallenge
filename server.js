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
	
		 res.json({ time : new Date(), method : 'GET' , path : '/process' , headers : req.headers ,
				query : req.query , duration : (random(15000,30000)/1000).toString()+"sec"});
})