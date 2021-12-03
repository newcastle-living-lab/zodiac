'use strict';

const Joi = require('joi');
const ProjectModel = require('../models/project');
const Config = require('config');
// const Hashids = require('../../lib/hashids');
const Auth = require('../../lib/auth');


/**
 * GET: /projects/{hashid}/edit: Edit project
 *
 */
exports.view = {

	description: 'Edit a project',

	auth: {
		mode: 'required'
	},

	async handler(request, h) {

		let projectHash = request.params.project_hash;
		let projectId = ProjectModel.decodeHash(projectHash);
		let project = ProjectModel.getById(projectId);
		let isEditable = Auth.isProjectEditable(project);


		if ( ! project) {
			request.yar.flash('error', 'Could not find the requested project.');
			return h.redirect(`/projects`);
		}

		if ( ! isEditable) {
			request.yar.flash('error', 'You cannot edit that project.');
			return h.redirect(`/projects/${projectHash}`);
		}

		return h.view('projects/edit', {
			title: "Edit project details",
			project: project,
			visibilityOptions: ProjectModel.visibilityOptions,
		});

	}

};


/**
 * POST: update a project
 *
 */
exports.post = {

	description: 'Update project',

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
			let projectHash = request.params.project_hash;
			request.yar.set('payload', request.payload);
			request.yar.flash('error', error.details[0].message.replace(/['"]+/g, ''));
			return h.redirect(`/projects/${projectHash}/edit`).takeover();
		}
	},

	async handler(request, h) {

		// Check project
		//
		let projectHash = request.params.project_hash;
		let projectId = ProjectModel.decodeHash(projectHash);
		let project = ProjectModel.getById(projectId);
		let isEditable = Auth.isProjectEditable(project);

		if ( ! project) return h.notFound('Could not find project.');
		if ( ! isEditable) return h.notFound('Not editable.');

		let data = {
			name: request.payload.name,
			description: request.payload.description,
			visibility: request.payload.visibility,
		};

		// Update activity
		ProjectModel.update(projectId, data);

		request.yar.clear('payload');

		request.yar.flash('success', "The project has been updated.");

		return h.redirect(`/projects/${projectHash}`);
	}

};