const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});

const ROUTES = require("./routes");

//add static files
app.use(express.static(__dirname + '/views'));

//set view engine
app.set('view engine', 'ejs');

// Routes
app.use('/peerjs', peerServer);
app.use(ROUTES);

// Socket Connection
io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit('user-connected', userId);

    socket.on('message', message => {
      io.to(roomId).emit('create-message', message);
    })

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId);
    })
  })
});


const PORT = 3000; 
server.listen(process.env.PORT || PORT);