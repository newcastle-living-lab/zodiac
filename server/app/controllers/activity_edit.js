'use strict';

const Boom = require('@hapi/boom');
const Joi = require('joi');
const Auth = require('../../lib/auth');
const Caches = require('../../lib/caches');
const io = require('../../lib/socketio').io;
const ProjectModel = require('../models/project');
const ActivityModel = require('../models/activity');


/**
 * GET: Show form/modal to update activity
 *
 */
exports.view = {

	description: 'Edit activity',

	auth: {
		mode: 'required'
	},

	async handler(request, h) {

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

		return modalView(h, {
			title: 'Update activity',
			project: project,
			activity: activity,
			projectHash: projectHash,
			activityHash: activityHash,
		});
	}

};


/**
 * POST: Update activity
 *
 */
exports.post = {

	description: 'Update activity',

	auth: {
		mode: 'required'
	},

	validate: {
		payload: Joi.object({
			title: Joi.string().min(2).max(50).required(),
			description: Joi.string().optional().allow(''),
		}),
		failAction(request, h, error) {
			// request.yar.set('payload', request.payload);
			// request.yar.flash('error', error.details[0].message.replace(/['"]+/g, ''));
			return 'Error';

			// return modalView(h, {
			// 	title: 'Update activity',
			// 	project: project,
			// 	activity: activity,
			// 	projectHash: projectHash,
			// 	activityHash: activityHash,
			// });
			// let uri = `/projects/${request.params.hashid}/add_activity`;
			// return h.redirect(uri).takeover();
		}
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

		let data = {
			title: request.payload.title,
			description: request.payload.description,
		};

		// Update activity
		ActivityModel.update(activityId, data);

		request.yar.clear('payload');

		// Check for current activity.
		// If it is current, then broadcast it so the changes are updated for participants.
		//
		let cacheKey = 'current_activity_' + projectHash;
		let currentActivity = await Caches.Project.get(cacheKey);

		if (currentActivity == activityHash) {

			let res = await Caches.Project.set(cacheKey, activityHash);
			let roomName = `project:${projectHash}`;
			io.in(roomName).emit('activity', { project: projectHash, activity: activityHash });

			request.yar.flash('success', "The activity has been updated and broadcast to any viewing participants.");

		}

		request.yar.flash('success', "The activity has been updated.");

		return h.redirect(`/projects/${projectHash}/activity/${activityHash}`);
	}

};




async function modalView(h, data) {
	return h.view('activities/edit', data);
};