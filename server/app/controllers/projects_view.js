'use strict';

const Joi = require('joi');
const ProjectModel = require('../models/project');
const ActivityModel = require('../models/activity');
const Config = require('config');
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

		let projectId = ProjectModel.decodeHash(request.params.hashid);
		let project = ProjectModel.getById(projectId);
		let isEditable = Auth.isProjectEditable(project);

		let activities = ActivityModel.findByProject(project.project_id);

		let view = (isEditable)
			? 'view_editable'
			: 'view_participant';

		return h.view('projects/' + view, {
			title: project.name,
			project: project,
			activities: activities,
			isEditable: isEditable,
		});

	}

};

