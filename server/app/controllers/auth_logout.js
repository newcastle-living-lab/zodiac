'use strict';

const Auth = require('../../lib/auth');

exports.logoutPost = {

	description: 'Log out user.',

	auth: {
		mode: 'required'
	},

	async handler(request, h) {

		Auth.logOutUser(request);
		request.yar.flash('success', "You have been logged out.");

		if (request.hx.is()) {
			return h.hxRedirect('/');
		} else {
			return h.redirect('/');
		}
	}

};