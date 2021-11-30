exports.plugin = {

	name: 'project_routes',

	async register(server, options) {

		const NewProjectController = require('../controllers/projects_new');
		const ViewProjectController = require('../controllers/projects_view');
		const EditProjectController = require('../controllers/projects_edit');
		const ProjectsIndexController = require('../controllers/projects_index');
		const ProjectEventController = require('../controllers/projects_events');
		const LiveProjectController = require('../controllers/projects_live');
		const NewActivityController = require('../controllers/activity_new');
		const ViewActivityController = require('../controllers/activity_view');
		const NewCommentController = require('../controllers/comments_new');

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
				path: '/projects/{project_hash}',
				options: ViewProjectController.view
			},
			{
				method: 'GET',
				path: '/projects/{hashid}/edit',
				options: EditProjectController.view
			}
		]);

		/**
		 * SSE
		 *
		 */
		server.route([
			{
				method: 'GET',
				path: '/projects/{project_hash}/events',
				options: ProjectEventController.view
			},
			{
				method: 'POST',
				path: '/projects/{project_hash}/broadcast_activity/{activity_hash}',
				options: ProjectEventController.broadcast_activity
			}
		]);

		/**
		 * Add activity
		 *
		 */
		server.route([
			// Create new activity for project
			{
				method: 'GET',
				path: '/projects/{hashid}/add_activity',
				options: NewActivityController.view
			},
			{
				method: 'POST',
				path: '/projects/{hashid}/add_activity',
				options: NewActivityController.post
			},
		]);

		/**
		 * Comments
		 *
		 */
		server.route([
			// Create new comment for activity
			{
				method: 'POST',
				path: '/projects/{project_hash}/add_comment',
				options: NewCommentController.post
			},
		]);

		/**
		 * Live modes
		 *
		 */
		server.route([
			{
				method: 'GET',
				path: '/projects/{project_hash}/live/activity',
				options: LiveProjectController.activity
			},
			{
				method: 'GET',
				path: '/projects/{project_hash}/live/comments',
				options: LiveProjectController.comments
			}
		]);

		/**
		 * View activity
		 *
		 */
		server.route([
			// View a single activity within a project
			{
				method: 'GET',
				path: '/projects/{project_hash}/activity/{activity_hash}',
				options: ViewActivityController.view
			},
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