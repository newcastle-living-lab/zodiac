'use strict';

const Caches = require('../../lib/caches');
const io = require('../../lib/socketio').io;

const ProjectModel = require('../models/project');
const ActivityModel = require('../models/activity');



exports.broadcast_activity = {
	description: 'Broadcast activity',

	auth: {
		mode: 'required',
	},

	async handler(request, h) {

		let projectHash = request.params.project_hash;
		let activityHash = request.params.activity_hash;

		let res = await Caches.Project.set('current_activity_' + projectHash, activityHash);
		let roomName = `project:${projectHash}`;
		io.in(roomName).emit('activity', { project: projectHash, activity: activityHash });

		return '';

	}
}