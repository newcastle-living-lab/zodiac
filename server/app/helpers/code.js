'use strict';

exports.generateCode = function generateCode(len) {

	const alphabet = '23456789ABCDEFGHJKMNPQRSTUVWXYZabcdefghkmnpqrstuvwxyz';
	const charsLength = alphabet.length;

	const randomBytes = require('crypto').randomBytes(len);
	let result = new Array(len);

	let cursor = 0;
	for (let i = 0; i < len; i++) {
		cursor += randomBytes[i];
		result[i] = alphabet[cursor % charsLength];
	}

	return result.join('');

}