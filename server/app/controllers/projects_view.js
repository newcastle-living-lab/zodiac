'use strict';

const Joi = require('joi');
const ProjectModel = require('../models/project');
const ActivityModel = require('../models/activity');
const Config = require('config');
const Auth = require('../../lib/auth');
const Caches = require('../../lib/caches');


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

		let projectHash = request.params.project_hash;
		let projectId = ProjectModel.decodeHash(projectHash);
		let project = ProjectModel.getById(projectId);
		let isEditable = Auth.isProjectEditable(project);

		let activities = ActivityModel.findByProject(project.project_id);

		const cacheKey = `current_activity_${projectHash}`;
		let activityHash = await Caches.Project.get(cacheKey);
		if ( ! activityHash && activities.length) {
			activityHash = ActivityModel.encodeId(activities[0].activity_id);
		}

		let view = (isEditable)
			? 'view_editable'
			: 'view_participant';

		return h.view('projects/' + view, {
			title: project.name,
			project: project,
			activities: activities,
			projectHash: projectHash,	// explicit: for the included _comment_form view
			activityHash: activityHash,	// for current selected activity
			isEditable: isEditable,
		});

	}

};

