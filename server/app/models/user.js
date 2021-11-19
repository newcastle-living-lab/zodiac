'use strict';

const DB = require('better-sqlite3-helper');
const TABLE = 'user';

/**
 * Find a single user by email address.
 *
 */
exports.getByEmail = function getByEmail(email) {
	let row = DB().queryFirstRow(`SELECT * FROM "${TABLE}" WHERE email = ?`, email);
	return row;
};


/**
 * Find a single user by ID
 *
 */
exports.getById = function getById(user_id) {
	let row = DB().queryFirstRow(`SELECT * FROM "${TABLE}" WHERE user_id = ?`, user_id);
	return row;
};



/**
 * Create a new user account with provided details.
 *
 */
exports.createAccount = function createAccount(email) {

	let user = DB().queryFirstRow(`SELECT user_id FROM "${TABLE}" WHERE email = ?`, email);
	if (user) return false;

	let data = {
		email: email,
		active: 1,
	};

	return DB().insert('user', data);
};


exports.touchLastLogin = function touchLastLogin(user_id) {
	return DB().update(TABLE, { last_login: Date.now() }, { user_id: user_id });
};


exports.update = function update(user_id, values) {
	return DB().update(TABLE, values, { user_id: user_id }, ['name', 'email', 'active']);
}