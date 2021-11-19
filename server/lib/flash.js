'use strict';

// This plugin should be loaded after vision

const Hoek = require('@hapi/hoek');

exports.plugin = {

	name : 'flash',

	async register(plugin, options) {

		let extOpts = { before: ['@hapi/yar'] };

		plugin.ext('onPreResponse', (request, h) => {

			try {
				if (request.yar && request.yar.flash && request.response.variety === 'view') {
					var flash = request.yar.flash();
					request.response.source.context = Hoek.applyToDefaults({
						flash: flash,
						hasFlash: (flash && Object.keys(flash).length > 0)
					}, request.response.source.context);
				}
				return h.continue;
			} catch (error) {
				throw error;
			}

		}, extOpts);

	}

};