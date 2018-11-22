var express = require('express');
var app = express();
var start = new Date();
var bodyParser = require('body-parser');
var responseTime = require('response-time');

app.get('/process', function (req, res) {
	
		 res.json({ time : new Date(), method : 'GET' , path : '/process' , headers : req.headers ,
				query : req.query});
})