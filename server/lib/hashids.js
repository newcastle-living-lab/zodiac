'use strict';

const Hashids = require('hashids/cjs');
const Path = require('path');

exports.plugin = {

	name: 'hashids',

	async register(plugin, options) {

		let AppHashids = {};

		let models = [
			'project',
			'activity',
		];

		models.forEach((name) => {
			AppHashids[name] = new Hashids(name, options.Config.get('hashids.length'), options.Config.get('hashids.alphabet'));
		});

		exports.encode = (model, id) => AppHashids[model].encode(id);
		exports.decode = (model, hashid) => AppHashids[model].decode(hashid);

	}

};