'use strict';

const DB = require('better-sqlite3-helper');

const Hashids = require('../../lib/hashids');

const TABLE = 'project';
const LINK = 'project_user_link';


exports.visibilityOptions = {
	'PUBLIC': 'Public',
	'UNLISTED': 'Unlisted',
};


exports.encodeId = (id) => Hashids.encode('project', id);
exports.decodeHash = (hash) => Hashids.decode('project', hash);


/**
 * Find a single project by ID
 *
 */
exports.getById = function getById(project_id) {
	let row = DB().queryFirstRow(`SELECT * FROM "${TABLE}" WHERE project_id = ?`, project_id);
	if ( ! row) return row;
	row._users = getUsers(row.project_id);
	return row;
};


/**
 * Get all public projects
 *
 */
exports.findPublic = function findPublic() {
	let rows = DB().query(`SELECT * FROM ${TABLE} WHERE visibility = 'PUBLIC' ORDER BY created_at DESC`);
	return rows;
};


exports.getUserProjectIds = function getUserProjectIds(user_id) {
	let sql = `SELECT project_id FROM ${LINK} WHERE user_id = ?`;
	let ids = DB().queryColumn('project_id', sql, user_id);
	return ids;
}


/**
 * Get all user's projects
 *
 */
exports.findByUser = function findByUser(user_id) {
	let sql = `SELECT p.*
				FROM ${TABLE} p
				INNER JOIN project_user_link l USING (project_id)
				WHERE l.user_id = ?
				GROUP BY p.project_id
				ORDER BY p.created_at DESC`;

	return DB().query(sql, user_id);
};

exports.insert = function insert(values) {
	values.created_at = Date.now();
	return DB().insert(TABLE, values, ['name', 'description', 'visibility', 'created_at']);
};


exports.update = function update(project_id, values) {
	return DB().update(TABLE, values, { project_id: project_id }, ['name', 'description', 'visibility']);
}

exports.remove = function remove(project_id) {
	return DB().delete(TABLE, { project_id: project_id });
}

exports.addUser = function addUser(project_id, user_id) {
	return DB().insert(LINK, { project_id: project_id, user_id: user_id});
}


exports.removeUser = function removeUser(project_id, user_id) {
	return DB().delete(LINK, { project_id: project_id, user_id: user_id});
}



//
//

/**
 * Get an object of users for the project, keyed by ID
 *
 */
const getUsers = function(project_id) {

	let sql = `SELECT u.user_id, u.name, u.email
				FROM user u
				INNER JOIN project_user_link l USING (user_id)
				WHERE l.project_id = ?`;

	let rows = DB().query(sql, project_id);

	return rows.reduce((cur, v) => {
		cur[v.user_id] = v;
		return cur;
	}, {});
}