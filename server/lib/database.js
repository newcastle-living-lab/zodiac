'use strict';

const DB = require('better-sqlite3-helper');
const Path = require('path');

exports.plugin = {

	name: 'database',

	async register(plugin, options) {

		const dbFile = options.Config.get('db');

		DB({
			path: Path.join(process.cwd(), 'data', dbFile),
			WAL: true,
			migrate: {
				force: false,
				table: 'migration',
				migrationsPath: Path.join(__dirname, '..', 'migrations'),
			}
		});

	}

};