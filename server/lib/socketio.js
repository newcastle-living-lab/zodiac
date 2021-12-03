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

			io.of('/').adapter.on('join-room', (roomName) => {
				const roomClientCount = io.sockets.adapter.rooms.get(roomName).size;
				// console.log(`room-join: ${roomName} client count is now ${roomClientCount}`);
				io.in(roomName).emit('participant_count', roomClientCount);
			});
			io.of('/').adapter.on('leave-room', (roomName, id) => {
				const roomClientCount = io.sockets.adapter.rooms.get(roomName).size;
				// console.log(`room-leave: ${roomName} client count is now ${roomClientCount}`);
				io.in(roomName).emit('participant_count', roomClientCount);
			});

			socket.on('join_project', function(projectHash) {
				let roomName = `project:${projectHash}`;
				socket.join(roomName);
			});

		});

	}

};