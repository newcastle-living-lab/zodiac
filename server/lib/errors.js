'use strict';

const Hoek = require('@hapi/hoek');

exports.plugin = {

	name: 'errorpages',

	async register(plugin, options) {

		plugin.ext('onPreResponse', (request, h) => {

			let resp = request.response
			if (!resp.isBoom) return h.continue;

			return h
				.view('error', resp.output.payload)
				.code(resp.output.statusCode);

		});

	}

};