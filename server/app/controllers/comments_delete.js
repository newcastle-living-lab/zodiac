'use strict';

const Boom = require('@hapi/boom');
const Joi = require('joi');
const Auth = require('../../lib/auth');
const Caches = require('../../lib/caches');
const io = require('../../lib/socketio').io;
const ProjectModel = require('../models/project');
const ActivityModel = require('../models/activity');
const CommentModel = require('../models/comment');

/**
 * POST: Delete activity
 *
 */
exports.post = {

	description: 'Delete comment',

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

		let commentHash = request.params.comment_hash;
		let commentId = CommentModel.decodeHash(commentHash);
		let comment = CommentModel.getById(commentId);

		let isEditable = Auth.isProjectEditable(project);

		if ( ! project) return h.notFound('Could not find project.');
		if ( ! activity) return h.notFound('Could not find activity.');
		if ( ! isEditable) return h.notFound('Not editable.');

		// Unpublish comment
		CommentModel.unpublish(commentId);

		let roomName = `project:${projectHash}`;
		io.in(roomName).emit('comments', { project: projectHash, activity: activityHash });

		if (request.hx.is()) {
			return '';
			// return h.hxRedirect(`/projects/${projectHash}`);
		} else {
			return h.redirect(`/projects/${projectHash}/activity/${activityHash}`);
		}
	}

};




async function modalView(h, data) {
	return h.view('activities/edit', data);
};