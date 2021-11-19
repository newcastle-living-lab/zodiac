exports.plugin = {

	name: 'index_route',

	async register(server, options) {
		const Controller = require('../controllers/index');
		server.route([
			{
				method: 'GET',
				path: '/',
				options: Controller.view
			},
		]);
	},

};