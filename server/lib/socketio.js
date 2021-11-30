'use strict';

const { Server } = require("socket.io");

exports.plugin = {

	name: 'socketio',

	async register(server, options) {

		// console.log("registering socket");
		// console.log(server.listener);

		const io = new Server(server.listener);

		exports.io = io;

		io.on('connection', function(socket) {

			console.log("connection!");

			// io.emit('broadcast');

			// socket.emit('Oh hii!');

			socket.on('join_project', function(projectHash) {
				let roomName = `project:${projectHash}`;
				console.log(`${socket.id} joined ${roomName}`);
				socket.join(roomName);
			});

			// socket.on('hello', Handlers.hello);
			// socket.on('newMessage', Handlers.newMessage);
			// socket.on('goodbye', Handlers.goodbye);

		});

	}

};