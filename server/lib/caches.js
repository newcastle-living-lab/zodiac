'use strict';

exports.plugin = {

	name: 'caches',

	async register(plugin, options) {

		exports.Project = plugin.cache({ segment: 'project', expiresIn: 24 * 1 * 3600 });

	}

};