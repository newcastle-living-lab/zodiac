'use strict';

const Hoek = require('@hapi/hoek');
const DB = require('better-sqlite3-helper');

const Hashids = require('../../lib/hashids');

const TABLE = 'activity';


exports.encodeId = (id) => Hashids.encode('activity', id);
exports.decodeHash = (hash) => Hashids.decode('activity', hash);



/**
 * Find a single activity by ID
 *
 */
exports.getById = function getById(activity_id) {
	let row = DB().queryFirstRow(`SELECT * FROM "${TABLE}" WHERE activity_id = ?`, activity_id);
	return row;
};


/**
 * Get all activities for a project
 *
 */
exports.findByProject = function findByProject(project_id, order_column='') {
	let allowedCols = ['created_at', 'position'];
	let sortCol = Hoek.contain(order_column, allowedCols) ? order_column : allowedCols[0];
	let rows = DB().query(`SELECT * FROM ${TABLE} WHERE project_id = ? ORDER BY ${sortCol} ASC`, project_id);
	return rows;
};


exports.getNextPos = function getNextPos(project_id) {
	let sql = `SELECT
				IIF(MAX(position) IS NULL, 0, MAX(position)+1)
				FROM ${TABLE}
				WHERE project_id = ?`;
	let value = DB().queryFirstCell(sql, project_id);
	return parseInt(value, 10);
}



exports.insert = function insert(values) {

	values.created_at = Date.now();

	values.position = values.position
		? values.position
		: exports.getNextPos(values.project_id);

	return DB().insert(TABLE, values, [
		'project_id',
		'user_id',
		'type',
		'title',
		'description',
		'image_filename',
		'external_url',
		'position',
		'created_at',
	]);
};


exports.update = function update(activity_id, values) {
	return DB().update(TABLE, values, { activity_id: activity_id }, [
		'type',
		'title',
		'description',
		'image_filename',
		'external_url',
		'position',
	]);
}


exports.remove = function remove(activity_id) {
	return DB().delete(TABLE, { activity_id: activity_id });
}