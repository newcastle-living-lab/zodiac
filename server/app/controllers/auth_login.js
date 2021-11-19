'use strict';

const Joi = require('joi');
const UserModel = require('../models/user');
const Mailer = require('../../lib/mailer');
const Auth = require('../../lib/auth');
const Config = require('config');


/**
 * GET: Show login form
 *
 */
exports.loginView = {
	description: 'Login page',
	auth: false, // <= This page is public
	async handler(request, h) {

		let payload = request.yar.get('payload', true);

		return h.view('auth/login', {
			title: 'Log in',
			payload: payload,
		});

	}

};


/**
 * POST: Take email + send login code.
 *
 */
exports.loginPost = {

	description: 'Handle log in request',

	auth: false,

	validate: {
		payload: Joi.object({
			email: Joi.string().min(3).email().required(),
		}),
		failAction(request, h, error) {
			request.yar.flash('error', error.details[0].message.replace(/['"]+/g, ''));
			return h.redirect('/auth/login').takeover();
		}
	},

	async handler(request, h) {

		let user = UserModel.getByEmail(request.payload.email);

		if ( ! user) {
			request.yar.set('payload', request.payload);
			request.yar.flash('error', "Could not find an account with that email address.");
			return h.redirect('/auth/login');
		}

		// Generate code
		const code = require('../helpers/code').generateCode(6);

		// Set subject
		const appName = Config.get('appName');
		const subject = `Temporary ${appName} login code`;

		const data = {
			login_code: code,
			subject: subject
		};

		let mailResult = await Mailer.sendMailTemplate(request.payload.email, 'login', data);

		if (mailResult.sent) {
			// Store code in session to check against
			request.yar.set('login_code', code);
			request.yar.set('login_user_id', user.user_id);
			request.yar.set('login_email', user.email);
			request.yar.flash('success', "Please check your email for a temporary login code.");
			return h.redirect('/auth/login/verify');
		} else {
			request.yar.set('payload', request.payload);
			request.yar.flash('error', "There was an error sending you an email.");
			return h.redirect('/auth/login');
		}
	}
};


/**
 * GET: Ask for login code
 *
 */
exports.loginVerifyView = {

	description: 'Show form to ask user for login code.',

	auth: false,

	async handler(request, h) {

		let email = request.yar.get('login_email');

		if ( ! email) return h.redirect('/auth/login');

		return h.view('auth/login_verify', {
			title: 'Login code',
			email: email,
		});

	}

};

exports.loginVerifyPost = {

	description: 'Check the auth code from the user.',

	auth: false,

	validate: {
		payload: Joi.object({
			code: Joi.string().length(6).required(),
		}),
		failAction(request, h, error) {
			request.yar.flash('error', error.details[0].message.replace(/['"]+/g, ''));
			return h.redirect('/auth/login/verify').takeover();
		}
	},

	async handler(request, h) {

		let userId = request.yar.get('login_user_id');
		let expected_code = request.yar.get('login_code');
		let user_code = request.payload.code;

		if (expected_code !== user_code) {
			console.log(`Expected: ${expected_code}. User: ${user_code}.`);
			request.yar.flash('error', "The code your entered was incorrect.");
			return h.redirect('/auth/login/verify');
		}

		request.yar.clear('login_user_id');
		request.yar.clear('login_code');
		request.yar.clear('login_email');
		request.yar.clear('payload');

		// Get user to ensure they are still active
		const user = UserModel.getById(userId);

		if ( ! user || user.active != '1') {
			request.yar.flash('error', "Your account could not be found.");
			return h.redirect('/auth/login');
		}

		// Log user in
		Auth.logInUser(request, user.user_id);
		request.yar.flash('success', "You are now logged in.");
		return h.redirect('/');

	}

};