'use strict';

const Hoek = require('@hapi/hoek');

exports.plugin = {

	name: 'context',

	async register(plugin, options) {

		plugin.ext('onPreResponse', (request, h) => {

			try {

				var internals = {
					devEnv: (process.env.NODE_ENV === 'development'),
					version: require('../package.json').version,
					year: (new Date()).getFullYear(),
					appName: options.Config.get('appName'),
					appNameLong: options.Config.get('appNameLong'),
					ui: options.Config.get('ui'),
					authUser: request.auth.isAuthenticated ? request.auth.credentials : null,
				};

				var response = request.response;
				if (response.variety && response.variety === 'view') {
					response.source.context = Hoek.merge(internals, request.response.source.context);
				}

				return h.continue;

			} catch (error) {
				throw error;
			}

		});
	}

};