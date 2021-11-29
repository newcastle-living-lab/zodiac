import htmx from 'htmx.org';
window.htmx = htmx;

import _hyperscript from 'hyperscript.org';
import eventsource from 'hyperscript.org/eventsource';
eventsource(_hyperscript);	// loads eventsource into _hyperscript

import { takeScreenshot, populateFileInput } from './screenshot';
window.screenshot = { takeScreenshot, populateFileInput };


// Get auth token form security from metadata
function getAuthToken() {
	return document.querySelector('meta[name="crumb"]').getAttribute('content');
}

// Configure htmx requests with form security.
document.body.addEventListener('htmx:configRequest', function(evt) {
	if (evt.detail.verb.toLowerCase() == 'get') return;
	evt.detail.parameters['crumb'] = getAuthToken();
});