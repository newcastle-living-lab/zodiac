'use strict';

const Boom = require('@hapi/boom');
const Joi = require('joi');
const Auth = require('../../lib/auth');
const Caches = require('../../lib/caches');
const io = require('../../lib/socketio').io;
const ProjectModel = require('../models/project');

/**
 * POST: Delete activity
 *
 */
exports.post = {

	description: 'Delete project',

	auth: {
		mode: 'required'
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

		// Delete activity
		ProjectModel.remove(projectId);

		request.yar.flash('success', "The project has been deleted.");

		if (request.hx.is()) {
			return h.hxRedirect(`/projects`);
		} else {
			return h.redirect(`/projects`);
		}
	}

};
