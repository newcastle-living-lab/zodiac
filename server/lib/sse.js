'use strict';

// var Readable = require('stream').Readable;
// var rs = Readable();

const PassThrough = require('stream').PassThrough;


function SSEHandler() {
	this.projectStreams = {};
}


/**
 * Broadcast 'activity' event on project stream.
 *
 */
SSEHandler.prototype.broadcastActivity = function(projectHash, activityHash) {
	console.log(`broadcastActivity(): ${projectHash} + ${activityHash}`);
	let stream = this.getProjectStream(projectHash);
	stream.write({
		event: 'activity',
		project: projectHash,
		activity: activityHash
	});
}


/**
 * Send custom data on a given project stream
 *
 */
SSEHandler.prototype.send = function(projectHash, data) {
	let stream = this.getProjectStream(projectHash);
	stream.write(data);
}



/**
 * Get a stream for the given project.
 *
 */
SSEHandler.prototype.getProjectStream = function(projectHash) {
	if ( ! this.projectStreams.hasOwnProperty(projectHash)) {
		console.log(`getProjectStream() Created stream for ${projectHash}`);
		this.projectStreams[projectHash] = new PassThrough({ objectMode: true });
	}
	return this.projectStreams[projectHash];
}



exports.plugin = {

	name: 'sse',

	async register(plugin, options) {

		exports.SSE = (new SSEHandler());

		// console.log("exporting sse");
		// console.log(exports.SSE);

		/*exports.broadcastActivity = function(projectHash, activityHash) {
			stream.write({
				event: 'activity',
				project: projectHash,
				activity: activityHash,
			});
		}

		exports.getStream = () => stream;

		exports.send = function(data) {
			stream.write(data);
		}*/
	}

};