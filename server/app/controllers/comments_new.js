'use strict';

const Path = require('path');
const Fs = require('fs');
const Boom = require('@hapi/boom');
const Joi = require('joi');
const Auth = require('../../lib/auth');
const Caches = require('../../lib/caches');
const SSE = require('../../lib/sse').SSE;
const ProjectModel = require('../models/project');
const ActivityModel = require('../models/activity');
const CommentModel = require('../models/comment');


/**
 * GET: Show New Project page
 *
 */
// exports.view = {

// 	description: 'Add new activity to project',

// 	auth: {
// 		mode: 'required'
// 	},

// 	async handler(request, h) {

// 		let payload = request.yar.get('payload', true);

// 		let projectId = ProjectModel.decodeHash(request.params.hashid);
// 		let project = ProjectModel.getById(projectId);
// 		let isEditable = Auth.isProjectEditable(project);

// 		if ( ! project) return h.notFound('Could not find project.');
// 		if ( ! isEditable) throw h.forbidden('You cannot add activities to this project.');

// 		return h.view('activities/new', {
// 			title: 'Add activity',
// 			project: project,
// 			project_hash_id: request.params.hashid,
// 			payload: payload,
// 		});

// 	}

// };


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
			comment: Joi.string().min(2).required(),
		}),
		failAction(request, h, error) {
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

		let activityHash = request.params.activity_hash;
		let activityId = ActivityModel.decodeHash(activityHash);
		let activity = ActivityModel.getById(activityId);

		let isEditable = Auth.isProjectEditable(project);

		// Data for form view
		let viewData = {
			project: project,
			activity: activity,
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
		SSE.broadcastComment(projectHash, activityHash);

		return formView(h, viewData);
	}

};


async function formView(h, data) {
	return h.view('projects/_comment_form', data);
};