'use strict';

const Joi = require('joi');
const UserModel = require('../models/user');
const Mailer = require('../../lib/mailer');
const Auth = require('../../lib/auth');
const Config = require('config');

/**
 * Handle register page
 *
 */
exports.registerView = {

	description: 'Create an account',

	auth: false,

	async handler(request, h) {

		let payload = request.yar.get('payload', true);

		return h.view('auth/register', {
			title: 'Create an account',
			payload: payload,
		});

	}

};


/**
 * Take email + send register code.
 *
 */
exports.registerPost = {
	description: 'Handle account creation request',
	auth: false,

	validate: {
		payload: Joi.object({
			name: Joi.string().min(1).max(50).required(),
			email: Joi.string().min(3).email().required(),
		}),
		failAction(request, h, error) {
			request.yar.flash('error', error.details[0].message.replace(/['"]+/g, ''));
			return h.redirect('/auth/register').takeover();
		}
	},

	async handler(request, h) {

		let user = UserModel.getByEmail(request.payload.email);

		request.yar.set('payload', request.payload);

		if (user) {
			request.yar.flash('error', "You already have an account using that email address.");
			return h.redirect('/auth/register');
		}

		// Generate code
		const code = require('../helpers/code').generateCode(4);

		// Set subject
		const appName = Config.get('appNameLong');
		const subject = `Welcome to ${appName}`;

		const data = {
			register_code: code,
			subject: subject
		};

		let mailResult = await Mailer.sendMailTemplate(request.payload.email, 'register', data);

		if (mailResult.sent) {
			// Store code in session to check against
			request.yar.set('register_code', code);
			request.yar.set('register_name', request.payload.name);
			request.yar.set('register_email', request.payload.email);
			request.yar.flash('success', "Please check your email for a verification code.");
			return h.redirect('/auth/register/verify');
		} else {
			request.yar.flash('error', "There was an error sending you an email.");
			return h.redirect('/auth/register');
		}
	}
};



/**
 * Handle register/verify page
 *
 */
exports.registerVerifyView = {

	description: 'Register: Verify email address',

	auth: false,

	async handler(request, h) {

		let email = request.yar.get('register_email');

		if ( ! email) return h.redirect('/auth/register');

		return h.view('auth/register_verify', {
			title: 'Verify your email address',
			email: email,
		});

	}

};


/**
 * Handle register/verify POST
 *
 */
exports.registerVerifyPost = {

	description: 'Register: Verify email address (form)',

	auth: false,

	validate: {
		payload: Joi.object({
			code: Joi.string().length(4).required(),
		}),
		failAction(request, h, error) {
			request.yar.flash('error', error.details[0].message.replace(/['"]+/g, ''));
			return h.redirect('/auth/register/verify').takeover();
		}
	},

	async handler(request, h) {

		let name = request.yar.get('register_name');
		let email = request.yar.get('register_email');
		let expected_code = request.yar.get('register_code');
		let user_code = request.payload.code;

		if (expected_code !== user_code) {
			console.log(`Expected: ${expected_code}. User: ${user_code}.`);
			request.yar.flash('error', "The code your entered was incorrect.");
			return h.redirect('/auth/register/verify');
		}

		const userId = UserModel.createAccount(name, email);

		if ( ! userId) {
			request.yar.flash('error', "Your account could not be created.");
			return h.redirect('/auth/register/verify');
		}

		request.yar.clear('register_name');
		request.yar.clear('register_email');
		request.yar.clear('register_code');

		// Log user in
		Auth.logInUser(request, userId);
		request.yar.flash('success', "You are now logged in.");
		return h.redirect('/');
	}

};

