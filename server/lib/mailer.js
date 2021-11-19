'use strict';

const Nodemailer = require("nodemailer");
const EmailTemplate = require('email-templates');
const Path = require('path');

exports.plugin = {

	name: 'mailer',

	async register(plugin, options) {

		// Init config + transport

		const mailConfig = options.Config.get('email');

		const from = `${mailConfig.sender_name} <${mailConfig.sender_email}>`;

		let transportConfig = {
			host: mailConfig.smtp_host,
			port: mailConfig.smtp_port,
			secure: mailConfig.smtp_secure,
		}

		if (mailConfig.smtp_user) {
			transportConfig.auth = {
				user: mailConfig.smtp_user,
				pass: mailConfig.smtp_pass
			}
		}

		const smtpTransport = Nodemailer.createTransport(transportConfig);


		exports.sendMailTemplate = async function mail(to, templateDir, locals, attachment) {

			locals.appName = options.Config.get('appName');
			locals.appNameLong = options.Config.get('appNameLong');

			return new Promise(async(resolve, reject) => {

				try {

					let attachments = [];

					if (attachment && Array.isArray(attachment) && attachment.length > 0) {
						attachments = attachment;
					}

					const email = new EmailTemplate({
						juice: true,
						juiceResources: {
							preserveImportant: true,
							webResources: {
								// this is the relative directory to CSS/image assets
								relativeTo: Path.join(__dirname, '..', 'public')
							}
						},
						message: {
							from: from,
							attachments: attachments
						},
						send: true,
						preview: false,
						transport: smtpTransport,
						views: {
							options: {
								extension: 'njk'
							}
						}
					});

					await email.send({
						template: Path.join(__dirname, '..', 'app', 'mail', templateDir),
						message: {
							to: to
						},
						locals: locals
					});

					return resolve({
						sent: true
					});

				} catch (error) {

					console.log('error', error);
					return resolve({
						sent: false,
						message: error
					});

				}
			});

		}

	}

};