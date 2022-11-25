var http = require('http').createServer();
var io = require('socket.io')(http);
var port = 3000;
http.listen(port, function () { return console.log("server listening on port: ".concat(port)); });
io.on('connection', function (socket) {
    console.log('connected');
    socket.on('message', function (evt) {
        console.log('message', evt);
        socket.broadcast.emit('message', evt);
    });
});
io.on('disconnect', function (evt) {
    console.log('some people left');
});
