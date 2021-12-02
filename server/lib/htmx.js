'use strict';

exports.plugin = {

	name: 'htmx',

	async register(plugin, options) {

		const hxRequestDecorator = function() {
			return function(request) {
				return new HxRequest(request);
			}
		}

		plugin.decorate('request', 'hx', hxRequestDecorator(), { apply: true });
		plugin.decorate('toolkit', 'hxRedirect', HxToolkit.redirect);
		plugin.decorate('toolkit', 'hxRefresh', HxToolkit.refresh);

	}

};


let HxRequest = function(request) {
	this._request = request;
	this._headers = request.headers;
}


HxRequest.prototype.is = function() {
	return (this._headers['hx-request'] === 'true' ? true : false);
}


HxRequest.prototype.currentUrl = function() {
	return this._headers['hx-current-url'];
}



let HxToolkit = {};

HxToolkit.redirect = function(uri) {
	const response = this.response();
	// response.type('text/plain');
	response.header('HX-Redirect', uri);
	return response;
}

HxToolkit.refresh = function(uri) {
	const response = this.response();
	response.header('HX-Refresh', 'true');
	return response;
}