/**
 * Created by gandrejc on 26.03..
 */
//var connect = require('connect');
//var serveStatic = require('serve-static');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

//connect().use(serveStatic(".")).listen(8081, function () {
//    console.log('Server running on 8081...');
//
//});

var port = parseInt(process.argv[2], 10) || 80;

app.use(express.static('.'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.post('/subscribe', function (req, res) {
    fs.appendFile("emails", req.body.email+"\n", function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("new email "+req.body.email+" saved");
    });
    res.status(200);
    res.send(req.body);
});

app.listen(port, function(){
    console.log("started on port "+port);
});








