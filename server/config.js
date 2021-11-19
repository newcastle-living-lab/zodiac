'use strict';

const config = require('./config/config.json');

exports.port = process.env.LLZ_PORT || config.port || 3000;

exports.smtp_host = process.env.LLZ_SMTP_HOST || config.smtp_host || 'localhost';
exports.smtp_port = process.env.LLZ_SMTP_PORT || config.smtp_port || 25;
exports.smtp_secure = process.env.LLZ_SMTP_SECURE || config.smtp_secure || false;
exports.smtp_user = process.env.LLZ_SMTP_USER || config.smtp_user || '';
exports.smtp_pass = process.env.LLZ_SMTP_PASS || config.smtp_pass || '';