'use strict';

const Joi = require('joi');
const Hashids = require('../../lib/hashids');
const ProjectModel = require('../models/project');


/**
 * GET: Show New Project page
 *
 */
exports.view = {

	description: 'Create new project form',

	auth: {
		mode: 'required'
	},

	async handler(request, h) {

		let payload = request.yar.get('payload', true);

		return h.view('projects/new', {
			title: 'Create new project',
			visibilityOptions: ProjectModel.visibilityOptions,
			payload: payload,
		});

	}

};


/**
 * POST: Create new project
 *
 */
exports.post = {

	description: 'Create new project',

	auth: {
		mode: 'required'
	},

	validate: {
		payload: Joi.object({
			name: Joi.string().min(2).max(100).required(),
			description: Joi.string().optional().allow(''),
			visibility: Joi.string().valid(...Object.keys(ProjectModel.visibilityOptions)),
		}),
		failAction(request, h, error) {
			request.yar.set('payload', request.payload);
			request.yar.flash('error', error.details[0].message.replace(/['"]+/g, ''));
			return h.redirect('/projects/new').takeover();
		}
	},

	async handler(request, h) {

		request.yar.set('payload', request.payload);

		let data = {
			name: request.payload.name,
			description: request.payload.description,
			visibility: request.payload.visibility,
		};

		let projectId = ProjectModel.insert(data);

		if ( ! projectId) {
			request.yar.flash('error', error.details[0].message.replace(/['"]+/g, ''));
			return h.redirect('/projects/new');
		}

		ProjectModel.addUser(projectId, request.auth.credentials.user_id);

		request.yar.clear('payload');
		request.yar.flash('success', "The new project has been created.");

		let hashId = ProjectModel.encodeId(projectId);
		return h.redirect(`/projects/${hashId}`);
	}

};
