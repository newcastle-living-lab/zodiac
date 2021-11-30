'use strict';

const Boom = require('@hapi/boom');
const Joi = require('joi');
const Auth = require('../../lib/auth');
const ProjectModel = require('../models/project');
const ActivityModel = require('../models/activity');


/**
 * GET: Show activity viewing page
 *
 */
exports.view = {

	description: 'View activity on a project',

	auth: {
		mode: 'try'
	},

	async handler(request, h) {

		let projectHash = request.params.project_hash;
		let projectId = ProjectModel.decodeHash(projectHash);
		let project = ProjectModel.getById(projectId);

		let activities = ActivityModel.findByProject(project.project_id);

		let activityHash = request.params.activity_hash;
		let activityId = ActivityModel.decodeHash(activityHash);
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
			projectHash: projectHash,
			activityHash: activityHash,
		});

	}

};

