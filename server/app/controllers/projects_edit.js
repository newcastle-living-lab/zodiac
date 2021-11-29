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

		let projectId = ProjectModel.decodeHash(request.params.hashid);
		let project = ProjectModel.getById(projectId);
		let isEditable = Auth.isProjectEditable(project);

		if ( ! isEditable) {
			request.yar.flash('error', 'You cannot edit that project.');
			return h.redirect(`/projects/${hashId}`);
		}

		return h.view('projects/edit', {
			title: project.name,
			project: project,
			isEditable: isEditable,
		});

	}

};

