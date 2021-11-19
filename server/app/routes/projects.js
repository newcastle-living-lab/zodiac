exports.plugin = {

	name: 'project_routes',

	async register(server, options) {

		const NewProjectController = require('../controllers/projects_new');
		const ViewProjectController = require('../controllers/projects_view');
		const EditProjectController = require('../controllers/projects_edit');
		const ProjectsIndexController = require('../controllers/projects_index');

		/**
		 * Create new project
		 *
		 */
		server.route([
			// GET: New project form
			{
				method: 'GET',
				path: `/projects/new`,
				options: NewProjectController.view
			},
			// POST: Create new project
			{
				method: 'POST',
				path: `/projects/new`,
				options: NewProjectController.post
			}
		]);

		/**
		 * Single project
		 *
		 */
		server.route([
			// View one project dashboard
			{
				method: 'GET',
				path: '/projects/{hashid}',
				options: ViewProjectController.view
			},
			{
				method: 'GET',
				path: '/projects/{hashid}/edit',
				options: EditProjectController.view
			}
		]);

		/**
		 * Project listings
		 *
		 */
		server.route([
			// Main project listing (will show tabs for All/Mine if logged in. Otherwise, all public projects)
			{
				method: 'GET',
				path: '/projects',
				options: ProjectsIndexController.view
			},
			// Main project listing (will show tabs for All/Mine if logged in. Otherwise, all public projects)
			{
				method: 'GET',
				path: '/projects/all',
				options: ProjectsIndexController.all
			},
			// Main project listing (will show tabs for All/Mine if logged in. Otherwise, all public projects)
			{
				method: 'GET',
				path: '/projects/mine',
				options: ProjectsIndexController.mine
			}
		]);

	},

};