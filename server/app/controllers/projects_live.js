'use strict';

const Joi = require('joi');
const ProjectModel = require('../models/project');
const ActivityModel = require('../models/activity');
const Auth = require('../../lib/auth');
const Caches = require('../../lib/caches');


/**
 * GET: /projects/{hash}/live/activity: Show current activity view for one project
 *
 */
exports.activity = {

	description: 'View project: Live mode: Activity',

	auth: {
		mode: 'try'
	},

	async handler(request, h) {

		let projectHash = request.params.project_hash;
		let projectId = ProjectModel.decodeHash(projectHash);
		let project = ProjectModel.getById(projectId);
		let isEditable = Auth.isProjectEditable(project);

		const cacheKey = `current_activity_${projectHash}`;
		let activityHash = await Caches.Project.get(cacheKey);
		let activity;
		if ( ! activityHash || ! activityHash.length) {
			activity = ActivityModel.findByProject(projectId)[0];
		} else {
			let activityId = ActivityModel.decodeHash(activityHash);
			activity = ActivityModel.getById(activityId);
		}

		return h.view('activities/live_activity', {
			activity: activity,
			comments: [],
		});

		// @todo get current activity from cache
		// @todo load activity from DB
		// @todo load view

		// return `Current activity for ${project.name}: ${activityHash}`;
	}

};


/**
 * GET: /projects/{hashid}: Show one project
 *
 */
exports.comments = {

	description: 'View project: Live mode: Comments',

	auth: {
		mode: 'try'
	},

	async handler(request, h) {

		let projectHash = request.params.project_hash;
		let projectId = ProjectModel.decodeHash(projectHash);
		let project = ProjectModel.getById(projectId);
		let isEditable = Auth.isProjectEditable(project);

		const cacheKey = `current_activity_${projectHash}`;
		let activityHash = await Caches.Project.get(cacheKey);
		let activity;
		if ( ! activityHash || ! activityHash.length) {
			activity = ActivityModel.findByProject(projectId)[0];
		} else {
			let activityId = ActivityModel.decodeHash(activityHash);
			activity = ActivityModel.getById(activityId);
		}

		return h.view('activities/live_comments', {
			activity: activity,
			comments: [],
		});
	}

};

