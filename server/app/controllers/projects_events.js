'use strict';

const Caches = require('../../lib/caches');
const SSE = require('../../lib/sse').SSE;

const ProjectModel = require('../models/project');
const ActivityModel = require('../models/activity');



/**
 * GET: /projects/{hashid}/events: SSE
 *
 */
exports.view = {

	description: 'Project events',

	auth: {
		mode: 'try'
	},

	async handler(request, h) {
		let projectHash = request.params.project_hash;
		return h.event(SSE.getProjectStream(projectHash), null);
	}

};


exports.broadcast_activity = {
	description: 'Broadcast activity as SSE',

	auth: {
		mode: 'required',
	},

	async handler(request, h) {

		let projectHash = request.params.project_hash;
		let activityHash = request.params.activity_hash;

		let res = await Caches.Project.set('current_activity_' + projectHash, activityHash);
		SSE.broadcastActivity(projectHash, activityHash);

		return '';

	}
}