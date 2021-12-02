'use strict';

const Boom = require('@hapi/boom');
const Joi = require('joi');
const Auth = require('../../lib/auth');
const Caches = require('../../lib/caches');
const io = require('../../lib/socketio').io;
const ProjectModel = require('../models/project');
const ActivityModel = require('../models/activity');

/**
 * POST: Delete activity
 *
 */
exports.post = {

	description: 'Delete activity',

	auth: {
		mode: 'required'
	},

	async handler(request, h) {

		// Check project
		//
		let projectHash = request.params.project_hash;
		let projectId = ProjectModel.decodeHash(projectHash);
		let project = ProjectModel.getById(projectId);

		let activityHash = request.params.activity_hash;
		let activityId = ActivityModel.decodeHash(activityHash);
		let activity = ActivityModel.getById(activityId);

		let isEditable = Auth.isProjectEditable(project);

		if ( ! project) return h.notFound('Could not find project.');
		if ( ! activity) return h.notFound('Could not find activity.');
		if ( ! isEditable) return h.notFound('Not editable.');

		// Delete activity
		ActivityModel.remove(activityId);

		// Check for current activity.
		// If it is current, then broadcast it so the changes are updated for participants.
		//
		let cacheKey = 'current_activity_' + projectHash;
		let currentActivity = await Caches.Project.get(cacheKey);

		if (currentActivity == activityHash) {
			let res = await Caches.Project.set(cacheKey, null);
			let roomName = `project:${projectHash}`;
			io.in(roomName).emit('activity', { project: projectHash, activity: activityHash });
		}

		request.yar.flash('success', "The activity has been deleted.");

		if (request.hx.is()) {
			return h.hxRedirect(`/projects/${projectHash}`);
		} else {
			return h.redirect(`/projects/${projectHash}`);
		}
	}

};




async function modalView(h, data) {
	return h.view('activities/edit', data);
};