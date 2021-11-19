exports.view = {

	description: 'main request handler',

	auth: {
		mode: 'try'
	},

	async handler(request, h) {

		return h.view('index/index', {
			auth: JSON.stringify(request.auth),
			title: 'Dashboard',
		});

	}

};