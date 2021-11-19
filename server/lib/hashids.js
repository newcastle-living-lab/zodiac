'use strict';

const Hashids = require('hashids/cjs');
const Path = require('path');

exports.plugin = {

	name: 'hashids',

	async register(plugin, options) {

		const AppHashids = new Hashids(options.Config.get('hashids.salt'), options.Config.get('hashids.length'));

		exports.encode = (id) => AppHashids.encode(id);
		exports.decode = (hashid) => AppHashids.decode(hashid);

	}

};