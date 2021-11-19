exports.plugin = {

	name: 'auth_routes',

	async register(server, options) {

		const LoginController = require('../controllers/auth_login');
		const LogoutController = require('../controllers/auth_logout');
		const RegisterController = require('../controllers/auth_register');
		const basePath = '/auth';

		server.route([
			/**
			 * Login
			 *
			 */
			{
				method: 'GET',
				path: `${basePath}/login`,
				options: LoginController.loginView
			},
			{
				method: 'POST',
				path: `${basePath}/login`,
				options: LoginController.loginPost
			},
			/**
			 * Login verify
			 *
			 */
			{
				method: 'GET',
				path: `${basePath}/login/verify`,
				options: LoginController.loginVerifyView
			},
			{
				method: 'POST',
				path: `${basePath}/login/verify`,
				options: LoginController.loginVerifyPost
			},
			/**
			 * Register
			 *
			 */
			{
				method: 'GET',
				path: `${basePath}/register`,
				options: RegisterController.registerView
			},
			{
				method: 'POST',
				path: `${basePath}/register`,
				options: RegisterController.registerPost
			},
			/**
			 * Register Verification
			 *
			 */
			{
				method: 'GET',
				path: `${basePath}/register/verify`,
				options: RegisterController.registerVerifyView
			},
			{
				method: 'POST',
				path: `${basePath}/register/verify`,
				options: RegisterController.registerVerifyPost
			},
			/**
			 * Logout
			 *
			 */
			{
				method: 'POST',
				path: `${basePath}/logout`,
				options: LogoutController.logoutPost
			},
		]);
	},

};