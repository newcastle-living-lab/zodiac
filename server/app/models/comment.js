'use strict';

const Hoek = require('@hapi/hoek');
const DB = require('better-sqlite3-helper');

const Hashids = require('../../lib/hashids');

const TABLE = 'comment';


exports.encodeId = (id) => Hashids.encode('comment', id);
exports.decodeHash = (hash) => Hashids.decode('comment', hash);



/**
 * Find a single comment by ID
 *
 */
exports.getById = function getById(comment_id) {
	let row = DB().queryFirstRow(`SELECT * FROM "${TABLE}" WHERE comment_id = ?`, comment_id);
	return row;
};


/**
 * Get all comments for an activity
 *
 */
exports.findByActivity = function findByActivity(activity_id, sort_column='', order_dir='desc') {
	let sortVals = ['created_at'];
	let orderVals = ['DESC', 'ASC'];
	let sortCol = Hoek.contain(sort_column, sortVals) ? sort_column : sortVals[0];
	let orderDir = Hoek.contain(order_dir.toUpperCase(), orderVals) ? order_dir.toUpperCase() : orderVals[0];

	let sql = `SELECT
					c.*,
					IIF(u.name IS NULL OR u.name = '', 'User #' || c.user_id, u.name) AS _user_name,
					u.email AS _user_email
				FROM ${TABLE} c
				INNER JOIN user u USING (user_id)
				WHERE activity_id = ?
				AND is_published = 1
				ORDER BY ${sortCol} ${orderDir}`
	let rows = DB().query(sql, activity_id);
	return rows;
};



exports.insert = function insert(values) {

	values.created_at = Date.now();

	return DB().insert(TABLE, values, [
		'project_id',
		'activity_id',
		'user_id',
		'is_published',
		'is_author',
		'body',
		'pos_x',
		'pos_y',
		'created_at',
	]);
};


exports.update = function update(comment_id, values) {
	return DB().update(TABLE, values, { comment_id: comment_id }, [
		'is_published',
		'body',
		'pos_x',
		'pos_y',
		'created_at',
	]);
}

exports.unpublish = function unpublish(comment_id) {
	return DB().update(TABLE, { is_published: 0 }, { comment_id: comment_id });
}