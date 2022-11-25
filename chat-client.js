var socket = require('socket.io-client')('http://localhost:3000/%27');
var repl = require('repl');
var chalk = require('chalk');
var username = null;
socket.on('disconnect', function () {
    socket.emit('disconnect');
});
socket.on('connect', function () {
    console.log(chalk.red('=== start chatting ==='));
    username = process.argv[2];
});
socket.on('message', function (data) {
    var cmd = data.cmd, username = data.username;
    console.log(chalk.green(username + ': ' + cmd));
});
repl.start({
    prompt: '',
    eval: function (cmd) {
        socket.send(cmd, username);
    }
});
