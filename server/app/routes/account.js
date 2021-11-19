exports.plugin = {

	name: 'account_routes',

	async register(server, options) {

		const AccountController = require('../controllers/account');

		server.route([
			/**
			 * View account details
			 *
			 */
			{
				method: 'GET',
				path: `/me`,
				options: AccountController.accountView
			},
			/**
			 * Update account details
			 */
			{
				method: 'POST',
				path: `/me`,
				options: AccountController.accountPost
			}
		]);
	},

};