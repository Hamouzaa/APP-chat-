var socket = require('socket.io-client')('http://localhost:3000/%27');
  const repl = require('repl')
  const chalk = require('chalk');
  var username = 'null';

  socket.on('disconnect', function() {
      socket.emit('disconnect')
  });

  socket.on('connect', () => {
      console.log(chalk.red('=== start chatting ==='))
      username = process.argv[2]
  })

  socket.on('message', (data) => {
      const { cmd, username } = data
      console.log(chalk.green(username + ': ' + cmd));
  })

  repl.start({
      prompt: '',
      eval: (cmd) => {
          socket.send(cmd, username)
      }
  })