
const Config = require('config');
const Boom = require('@hapi/boom');
const Handlebars = require('handlebars');
const Nunjucks = require('nunjucks');
const CatboxRedis = require('@hapi/catbox-redis');


const plugins = [
	{
		plugin: require('@hapi/yar'),
		options: Config.get('yar')
	},
	{
		plugin: require('@hapi/crumb'),
		options: Config.get('crumb')
	},
	{
		plugin: require('@hapi/inert'),
	},
	{
		plugin: require('hapi-boom-decorators'),
	},
	{
		plugin: './lib/socketio',
	},
	{
		plugin: './lib/flash',
	},
	{
		plugin: './lib/context',
		options: {
			Config: Config
		}
	},
	{
		plugin: './lib/mailer',
		options: {
			Config: Config
		}
	},
	{
		plugin: './lib/hashids',
		options: {
			Config: Config
		}
	},
	{
		plugin: './lib/database',
		options: {
			Config: Config
		}
	},
	{
		plugin: './lib/auth',
	},
	{
		plugin: './lib/caches',
	},
	{
		plugin: './lib/htmx',
	},
	{
		plugin: './app/routes/core'
	},
	{
		plugin: './app/routes/index'
	},
	{
		plugin: './app/routes/auth'
	},
	{
		plugin: './app/routes/account',
	},
	{
		plugin: './app/routes/projects',
	},
];



exports.manifest = {
	server: {
		router: {
			stripTrailingSlash: true,
			isCaseSensitive: false
		},
		routes: {
			security: {
				hsts: (process.env.NODE_ENV === 'production' ? true : false),
				xss: true,
				noOpen: true,
				noSniff: true,
				xframe: false
			},
			cors: true,
			// jsonp: 'callback', // <3 Hapi,
			auth: 'simple',
			validate: {
				options: {abortEarly: false},
				failAction: async (request, h, err) => {
					// TODO: handle fail action and error messages better
					// err.details
					// you can set these messages to flash, request.yar is accessible here
					// WARNING
					// This piece of code is untested to malicious payloads.
					if (err.isBoom && err.isJoi) {
						const {details} = err;
						const output = {};
						for (let e of details) {
							const {message, path} = e;
							if (Array.isArray(path) && path.length > 0) {
								output[path[0]] = message;
							} else {
								output["generic-error"] = message;
							}
						}

						const newErr = Boom.badRequest("Invalid Request");
						newErr.output.payload['details'] = output;

						return newErr
					}

					return err
				}
			}
		},
		debug: Config.debug,
		port: Config.port,
		cache: [
			Config.redisCacheName
			?
				{
					name: Config.redisCacheName,
					provider: { constructor: CatboxRedis, options: Config.redisCache }
				}
			:
				{
					provider: { constructor: require('@hapi/catbox-memory'), options: { partition: 'hapi-cache' } }
				}
		]
	},
	register: {
		plugins
	}
};


exports.options = {
	// Somehow vision only works if you register your vision plugin at this point.
	// Otherwise, it gives you an error => "Cannot render view without a views manager configured".
	// Not a perfect solution but it works OK
	preRegister: async (server) => {
		await server.register(require('@hapi/vision'));
		server.views({
			engines: {
				njk: {
					compile: (src, options) => {
						const template = Nunjucks.compile(src, options.environment, options.filename);
						return (context) => {
							return template.render(context);
						};
					},
					prepare: (options, next) => {

						options.compileOptions.environment = Nunjucks.configure(options.path, { watch: false });

						let nunjucksDate = require('nunjucks-date');
						nunjucksDate.setDefaultFormat('MMM Do YYYY');
						nunjucksDate.install(options.compileOptions.environment);

						let hashids = require('../lib/hashids');

						options.compileOptions.environment.addFilter('hashid', function(id, model) {
							return hashids.encode(model, id);
						});

						return next();
					}
				}
			},
			path: './app/views',
			isCached: (process.env.NODE_ENV === 'development' ? false : true),
			/*engines: {
				hbs: Handlebars,
			},
			path: './app/views',
			layoutPath: './app/views/layouts',
			helpersPath: './app/views/helpers',
			partialsPath: './app/views/partials',
			layout: 'default',
			isCached: (process.env.NODE_ENV === 'development' ? false : true)*/
		});
	}
}