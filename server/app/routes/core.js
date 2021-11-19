const Path = require('path');

exports.plugin = {

	name: 'core_routes',

	async register(server, options) {

		server.route([
			{
				method: 'GET',
				path: '/assets/{param*}',
				options: {
					auth: false
				},
				handler: {
					directory: {
						path: 'public',
						redirectToSlash: true,
						index: false,
					}
				}
			},
			{
				method: 'GET',
				path: '/uploads/{param*}',
				options: {
					auth: false
				},
				handler: {
					directory: {
						path: Path.join('data', 'uploads'),
						redirectToSlash: true,
						index: false,
					}
				}
			}
		]);

	},


};