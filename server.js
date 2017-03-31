var express = require('express')
var http = require('http');
var path = require('path');
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function (client) {
    client.on('event', function (data) {
        console.log("Connection:");
        console.log(data);
    });
    client.on('disconnect', function (data) {
        console.log("Disconnection:");
        console.log(data)
    });
});

app.set('port', process.env.PORT || 3000);

//app.set('views', __dirname);
//app.set('view engine', 'jade');
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
//app.use(express.methodOverride());
app.use(express.static(__dirname));
//app.use(app.router);
/*
// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};
*/

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

// JSON API
//app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
//app.get('*', routes.index);

// Socket.io Communication
io.sockets.on('connection', require('./routes/socket'));

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});