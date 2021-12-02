'use strict';

const Joi = require('joi');
const ProjectModel = require('../models/project');
const ActivityModel = require('../models/activity');
const CommentModel = require('../models/comment');
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
		});
	}

};


/**
 * GET:
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

		let activityHash;
		let activityId;
		let activity;

		if (isEditable && request.query.activity) {
			// If is editable, then allow the feed to be a specific activity.
			// This allows the feed to be loaded from the user's Edit-level page
			activityHash = request.query.activity;
		} else {
			// Otherwise, get the current activity for the project
			const cacheKey = `current_activity_${projectHash}`;
			activityHash = await Caches.Project.get(cacheKey);
		}

		if (activityHash) {
			activityId = ActivityModel.decodeHash(activityHash);
			activity = ActivityModel.getById(activityId);
		} else {
			activity = ActivityModel.findByProject(projectId)[0];
		}

		let comments = CommentModel.findByActivity(activity.activity_id);

		return h.view('activities/live_comments', {
			deletable: (isEditable),
			projectHash: projectHash,
			activityHash: activityHash,
			// activity: activity,
			comments: comments,
		});
	}

};

