import htmx from 'htmx.org';
window.htmx = htmx;

// window._hyperscript = _hyperscript;
import _hyperscript from 'hyperscript.org';
import eventsource from 'hyperscript.org/eventsource';
eventsource(_hyperscript);

// import socket from 'hyperscript.org/socket';
// import eventsource from 'hyperscript.org/eventsource';
// import 'hyperscript.org/dist/_hyperscript_w9y.modern.js';

import { takeScreenshot, populateFileInput } from './screenshot';
window.screenshot = { takeScreenshot, populateFileInput };

function getAuthToken() {
	return document.querySelector('meta[name="crumb"]').getAttribute('content');
}

document.body.addEventListener('htmx:configRequest', function(evt) {
	evt.detail.parameters['crumb'] = getAuthToken();
	// evt.detail.headers['X-CSRF-Token'] = getAuthToken();
});