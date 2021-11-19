'use strict';

const Joi = require('joi');
const UserModel = require('../models/user');
const Config = require('config');


/**
 * GET: Show account page
 *
 */
exports.accountView = {

	description: 'Account page',

	auth: {
		mode: 'required'
	},

	async handler(request, h) {

		let user = UserModel.getById(request.auth.credentials.user_id);

		return h.view('account/index', {
			title: 'Your account',
			user: user,
		});

	}

};


/**
 * POST: Update account details
 *
 */
exports.accountPost = {

	description: 'Save user details',

	auth: {
		mode: 'required'
	},

	validate: {
		payload: Joi.object({
			name: Joi.string().optional().allow('').max(50)
		}),
		failAction(request, h, error) {
			request.yar.flash('error', error.details[0].message.replace(/['"]+/g, ''));
			return h.redirect('/me').takeover();
		}
	},

	async handler(request, h) {

		let user = UserModel.getById(request.auth.credentials.user_id);

		UserModel.update(request.auth.credentials.user_id, {
			name: request.payload.name
		});

		request.yar.flash('success', "Your account details have been updated.");
		return h.redirect('/me');
	}

};
