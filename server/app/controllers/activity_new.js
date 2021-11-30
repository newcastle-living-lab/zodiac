'use strict';

const Path = require('path');
const Fs = require('fs');
const Boom = require('@hapi/boom');
const Joi = require('joi');
const Auth = require('../../lib/auth');
const Caches = require('../../lib/caches');
// const SSE = require('../../lib/sse').SSE;
const io = require('../../lib/socketio').io;
const ProjectModel = require('../models/project');
const ActivityModel = require('../models/activity');


/**
 * GET: Show New Project page
 *
 */
exports.view = {

	description: 'Add new activity to project',

	auth: {
		mode: 'required'
	},

	async handler(request, h) {

		let payload = request.yar.get('payload', true);

		let projectId = ProjectModel.decodeHash(request.params.hashid);
		let project = ProjectModel.getById(projectId);
		let isEditable = Auth.isProjectEditable(project);

		if ( ! project) return h.notFound('Could not find project.');
		if ( ! isEditable) throw h.forbidden('You cannot add activities to this project.');

		return h.view('activities/new', {
			title: 'Add activity',
			project: project,
			project_hash_id: request.params.hashid,
			payload: payload,
		});

	}

};


/**
 * POST: Add new activity
 *
 */
exports.post = {

	description: 'Add new activity',

	auth: {
		mode: 'required'
	},

	validate: {
		payload: Joi.object({
			title: Joi.string().min(2).max(50).required(),
			description: Joi.string().optional().allow(''),
			type: Joi.string().valid('image_upload', 'image_screenshot'),
			activity_image: Joi.any().required(),
		}),
		failAction(request, h, error) {
			request.yar.set('payload', request.payload);
			request.yar.flash('error', error.details[0].message.replace(/['"]+/g, ''));
			let uri = `/projects/${request.params.hashid}/add_activity`;
			return h.redirect(uri).takeover();
		}
	},

	payload: {
		parse: true,
		allow: 'multipart/form-data',
		multipart: { output: 'file' },
		uploads: Path.join(__dirname, '..', '..', 'data', 'uploads'),
		maxBytes: 10 * 1024 * 1024,
	},

	async handler(request, h) {

		// Check project
		//
		let projectHash = request.params.hashid;
		let projectId = ProjectModel.decodeHash(projectHash);
		let project = ProjectModel.getById(projectId);
		let isEditable = Auth.isProjectEditable(project);

		if ( ! project) return h.notFound('Could not find project.');
		if ( ! isEditable) throw h.forbidden('You cannot add activities to this project.');

		let returnUri = `/projects/${request.params.hashid}/add_activity`;

		request.yar.set('payload', request.payload);

		if ( ! request.payload.activity_image) {
			request.yar.flash('error', 'Please upload an image.');
			return h.redirect(returnUri);
		}

		let imageData;
		try {
			imageData = await moveImage(request.payload.activity_image);
		} catch (err) {
			request.yar.flash('error', err);
			return h.redirect(returnUri);
		}

		let data = {
			project_id: projectId,
			user_id: request.auth.credentials.user_id,
			type: request.payload.type,
			title: request.payload.title,
			description: request.payload.description,
			image_filename: imageData.basename,
		};

		let activityId = ActivityModel.insert(data);

		if ( ! activityId) {
			request.yar.flash('error', error.details[0].message.replace(/['"]+/g, ''));
			return h.redirect(returnUri);
		}

		let activityHash = ActivityModel.encodeId(activityId);

		// Broadcast new activity
		let res = await Caches.Project.set('current_activity_' + projectHash, activityHash);

		// SSE.broadcastActivity(projectHash, activityHash);
		let roomName = `project:${projectHash}`;
		io.in(roomName).emit('activity', { project: projectHash, activity: activityHash });

		request.yar.clear('payload');
		request.yar.flash('success', "The new activity has been added and broadcast to any viewing participants.");

		return h.redirect(`/projects/${projectHash}/activity/${activityHash}`);
	}

};


async function moveImage(image) {

	let mime = image.headers['content-type'].toLowerCase();

	let mimesToExt = {
		'image/jpeg': 'jpg',
		'image/jpg': 'jpg',
		'image/png': 'png',
	};

	return new Promise((resolve, reject) => {

		if ( ! mimesToExt.hasOwnProperty(mime)) {
			reject('Unsupported image type: please use JPEG or PNG.');
			return;
		}

		let ext = mimesToExt[mime];

		let newFilename = image.path + '.' + ext;
		let basename = Path.basename(newFilename);

		let rename = Fs.rename(image.path, newFilename, (err) => {

			if (err) {
				reject(err);
				return;
			}

			resolve({ basename: basename });
		});

	});

}