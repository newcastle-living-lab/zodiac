'use strict';

const Joi = require('joi');
const ProjectModel = require('../models/project');
const Config = require('config');
const Hashids = require('../../lib/hashids');
const Auth = require('../../lib/auth');



/**
 * GET: /projects: Show all projects
 *
 */
exports.view = {

	description: 'View projects',

	auth: {
		mode: 'try'
	},

	async handler(request, h) {

		const hasUser = (request.auth.isAuthenticated);

		let projects = hasUser
			? ProjectModel.findByUser(request.auth.credentials.user_id)
			: ProjectModel.findPublic();

		let viewName = hasUser
			? 'projects/index_user'
			: 'projects/index_public';

		return h.view(viewName, {
			title: 'Projects',
			// Force 'mine' tab to be active
			activeTab: hasUser ? 'mine' : 'public',
			// List of projects to show
			projects: projects,
		});

	}

};


exports.mine = {

	description: 'View projects belonging to user',

	auth: {
		mode: 'required',
	},

	async handler(request, h) {

		let projects = ProjectModel.findByUser(request.auth.credentials.user_id);

		return h.view('projects/index_user', {
			title: 'Projects',
			activeTab: 'mine',
			projects: projects,
		});
	}
}



exports.all = {

	description: 'View all public projects',

	auth: {
		mode: 'try',
	},

	async handler(request, h) {

		const hasUser = (request.auth.isAuthenticated);

		let projects = ProjectModel.findPublic();

		let viewName = hasUser
			? 'projects/index_user'
			: 'projects/index_public';

		return h.view(viewName, {
			title: 'Projects',
			// Force 'public' tab to be active
			activeTab: 'public',
			// List of projects to show
			projects: projects,
		});
	}

}