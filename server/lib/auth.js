'use strict';

const Boom = require('@hapi/boom');
const UserModel = require('../app/models/user');
const ProjectModel = require('../app/models/project');

// Yar session key to use for logged-in User ID.
const AUTH_SESSION_KEY = 'auth_user_id';

exports.plugin = {

	name: 'auth',

	async register(server, options) {

		server.ext('onRequest', (request, h) => {

			exports.isProjectEditable = function isProjectEditable(project) {
				if ( ! project) {
					console.log("no project");
					return false;
				}
				if ( ! request.auth.isAuthenticated) {
					console.log("not authed");
					return false;
				}
				if ( ! project.hasOwnProperty('_users')) {
					console.log("no _users");
					return false;
				}
				const userId = request.auth.credentials.user_id;
				if (project._users.hasOwnProperty(`${userId}`)) {
					return true;
				} else {
					console.log("user NOT in list!");
				}

				return false;
			}

			return h.continue;

		});


		/**
		 * Log a user in by setting the userId value to the 'auth_user' session key.
		 *
		 */
		exports.logInUser = function logInUser(request, userId) {
			UserModel.touchLastLogin(userId);
			return request.yar.set(AUTH_SESSION_KEY, userId);
		}

		exports.logOutUser = function logOutUser(request) {
			request.yar.clear(AUTH_SESSION_KEY);
			request.yar.reset();
			return true;
		}


		/**
		 * Handle an auth failure.
		 *
		 */
		// const failAuth = function(request, h, reason) {
		// 	console.log(`failAuth(): ${reason}`);
		// 	// @TODO check for htmx?
		// 	const headers = request.headers;
		// 	// if this request is xmlhttp then return as json
		// 	if (headers['x-requested-with'] === 'XMLHttpRequest') {
		// 		throw Boom.unauthorized("Please log in.");
		// 	}
		// 	if (reason) {
		// 		request.yar.flash('error', reason);
		// 	}
		// 	// redirect user to login page
		// 	return h.redirect('/auth/login').takeover();
		// }


		/**
		 * Auth plugin implementation
		 *
		 */
		const implementation = function(server, options) {

			return {

				async authenticate(request, h) {

					const userId = request.yar.get(AUTH_SESSION_KEY);

					if ( ! userId) {
						throw Boom.unauthorized("No ID");
						// return h.unauthenticated("Not logged in");
						// return { credentials: null, isValid: false };
						// return failAuth(request, h, "Please log in.");
					}

					const user = UserModel.getById(userId);

					// Find user
					if ( ! user || user.active != '1') {
						throw Boom.unauthorized("No User");
						// return h.unauthenticated("User not found or not acitve.");
						// return { credentials: null, isValid: false };
						// return failAuth(request, h, "Could not find user or account not active.");
					}

					// For easy checking of membership
					user._projectIds = ProjectModel.getUserProjectIds(user.user_id);

					return h.authenticated({
						credentials: user
					});

				}
			}
		};

		server.auth.scheme('basic', implementation);
		server.auth.strategy('simple', 'basic');
		server.auth.default('simple');

	},
};