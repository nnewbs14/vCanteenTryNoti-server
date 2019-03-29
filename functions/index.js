const functions = require('firebase-functions');

var {google} = require('googleapis');
var MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
var SCOPES = [MESSAGING_SCOPE];

var express = require('express');
var app = express(); 

var bodyParser = require('body-parser');
var router = express.Router(); 

var request = require('request');

// var http = require('http')

// var port = 8085; 

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// router.post('/send', function(req, res){
//     res.json({
//         'message' : 'E hia e sus'
//     });
// });

router.post('/send', function(req, res){

    getAccessToken().then(function(access_token){

        var title = req.body.title; 
        var body = req.body.body; 
        var token = req.body.token; 

        request.post({
            headers:{
                Authorization: 'Bearer '+access_token
            }, 
            url: "https://fcm.googleapis.com/v1/projects/vcanteentrynoti-1532f/messages:send", 
            body: JSON.stringify(
                {
                    "message":{
                        "token" : token,
                        "notification" : {
                            "body" : body,
                            "title" : title,
                        }
                    }
                }
            )
        }, function(error, response, body){
            res.end(body);
            console.log(body);
        });
    });
});

app.use('/api', router);

// app.listen(port, function(){
//     console.log("Server is listening to port "+ port);
// });

function getAccessToken(){
    return new Promise(function(resolve, reject){
        var key = require("./service-account.json");
        var jwtClient = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            SCOPES,
            null
        );
        jwtClient.authorize(function(err, tokens){
            if(err){
                reject(err);
                return; 
            }
            resolve(tokens.access_token);
        });
    });
}

// getAccessToken().then(function(access_token){
//     console.log(access_token);
// });

// var server = http.createServer(function(req, res){
//     getAccessToken().then(function(access_token){
//         res.end(access_token)
//     });
// });

// server.listen(3000, function(){
//     console.log("Server started")
// });



exports.api = functions.https.onRequest(app);
