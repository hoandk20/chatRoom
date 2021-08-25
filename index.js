const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const path = require('path');
const app = express();

const server = http.createServer(app);
const io = new Server(server);

server.listen(process.env.PORT || 3000);

io.on('connection', (socket) => {
    socket.on('on-chat', data => {
        io.emit('user-chat', data);
    })
    socket.on('on-connect', data => {
        io.emit('user-connect', data);
    })
})
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function (req, res) {
    res.sendFile(__dirname+'/views/index.html');
})
