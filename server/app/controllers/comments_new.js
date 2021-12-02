'use strict';

const Path = require('path');
const Fs = require('fs');
const Boom = require('@hapi/boom');
const Joi = require('joi');
const Auth = require('../../lib/auth');
const Caches = require('../../lib/caches');
const io = require('../../lib/socketio').io;
const ProjectModel = require('../models/project');
const ActivityModel = require('../models/activity');
const CommentModel = require('../models/comment');


/**
 * POST: Add new comment
 *
 */
exports.post = {

	description: 'Add new comment',

	auth: {
		mode: 'required'
	},

	validate: {
		payload: Joi.object({
			activity: Joi.string().required(),
			comment: Joi.string().min(2).required(),
		}),
		failAction(request, h, error) {

			let viewData = {

			}
			// @todo an error view
			// user htmx error placement to put it somewhere else
			return 'Error submitting comment.';
			// request.yar.set('payload', request.payload);
			// request.yar.flash('error', error.details[0].message.replace(/['"]+/g, ''));
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
		if ( ! project) return h.notFound('Could not find project.');

		let activityHash = request.payload.activity;
		let activityId = ActivityModel.decodeHash(activityHash);
		let activity = ActivityModel.getById(activityId);

		let isEditable = Auth.isProjectEditable(project);

		// Data for form view
		let viewData = {
			projectHash: projectHash,
			activityHash: activityHash,
		};

		// Data for comment to add
		let commentData = {
			project_id: projectId,
			activity_id: activityId,
			user_id: request.auth.credentials.user_id,
			is_published: 1,		// default to yes
			is_author: isEditable ? 1 : 0,		// set project author flag is is editable by user
			body: request.payload.comment,
		};

		let commentId = CommentModel.insert(commentData);

		if ( ! commentId) {
			// @todo add error message / htmx headers?
			return formView(h, viewData);
		}

		// Broadcast new activity for comments
		let roomName = `project:${projectHash}`;
		io.in(roomName).emit('comments', { project: projectHash, activity: activityHash });

		return formView(h, viewData);
	}

};


async function formView(h, data) {
	return h.view('projects/_comment_form', data);
};