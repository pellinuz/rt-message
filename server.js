const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/home.html');
});

app.get('/message', (req, res) => {
	res.sendFile(__dirname + '/message.html');
});

app.get('/style.home.css', (req, res) => {
	res.sendFile(__dirname + '/style.home.css');
});

app.get('/style.message.css', (req, res) => {
	res.sendFile(__dirname + '/style.message.css');
});

let message = '';

io.on('connection', (socket) => {
	// Send the message to the client when it will connect
	socket.emit('updateMessage', message);

	// Manages the message sent by the client
	socket.on('sendMessage', (newMessage) => {
		message = newMessage;
		// Send the updated message to all the clients
		io.emit('updateMessage', message);
	});
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
	
