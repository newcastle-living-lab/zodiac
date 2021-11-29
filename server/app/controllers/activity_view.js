'use strict';

const Boom = require('@hapi/boom');
const Joi = require('joi');
const Auth = require('../../lib/auth');
const ProjectModel = require('../models/project');
const ActivityModel = require('../models/activity');


/**
 * GET: Show New Project page
 *
 */
exports.view = {

	description: 'View activity on a project',

	auth: {
		mode: 'try'
	},

	async handler(request, h) {

		let projectId = ProjectModel.decodeHash(request.params.project_hash);
		let project = ProjectModel.getById(projectId);

		let activities = ActivityModel.findByProject(project.project_id);

		let activityId = ActivityModel.decodeHash(request.params.activity_hash);
		let activity = ActivityModel.getById(activityId);


		let isEditable = Auth.isProjectEditable(project);

		if ( ! project) return h.notFound('Could not find project.');
		if ( ! activity) return h.notFound('Could not find activity.');

		let view = (isEditable)
			? 'view_editable'
			: 'view_participant';

		return h.view('activities/' + view, {
			title: [project.name, ': ', activity.title].join(''),
			project: project,
			activities: activities,
			activity: activity,
		});

	}

};

