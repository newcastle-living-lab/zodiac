#!/usr/bin/env node

'use strict';

const Glue = require('@hapi/glue');
const serverConfig = require('./config/manifest');

const options = {...serverConfig.options, relativeTo: __dirname};


const init = async () => {
	try {
		const server = await Glue.compose(serverConfig.manifest, options);
		await server.start();
		console.log('Living Lab Zodiac server running on %s', server.info.uri);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

init();

