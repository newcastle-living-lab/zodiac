'use strict';

const Joi = require('joi');
const ProjectModel = require('../models/project');
const Config = require('config');
const Hashids = require('../../lib/hashids');
const Auth = require('../../lib/auth');


/**
 * GET: /projects/{hashid}: Show one project
 *
 */
exports.view = {

	description: 'View a project',

	auth: {
		mode: 'try'
	},

	async handler(request, h) {

		let projectId = Hashids.decode(request.params.hashid);

		let project = ProjectModel.getById(projectId);

		let isEditable = Auth.isProjectEditable(project);

		return h.view('projects/view', {
			title: project.name,
			project: project,
			isEditable: isEditable,
		});

	}

};

