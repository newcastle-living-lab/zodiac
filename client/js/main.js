//

function getAuthToken() {
	return document.querySelector('meta[name="crumb"]').getAttribute('content');
}

document.body.addEventListener('htmx:configRequest', function(evt) {
	evt.detail.parameters['crumb'] = getAuthToken();
	// evt.detail.headers['X-CSRF-Token'] = getAuthToken();
});