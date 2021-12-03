/**
 * htmx
 *
 */
import htmx from 'htmx.org';
window.htmx = htmx;


/**
 * _hyperscript
 *
 */
import _hyperscript from 'hyperscript.org';


/**
 * Screenshots
 *
 */
import { takeScreenshot, populateFileInput } from './screenshot';
window.screenshot = { takeScreenshot, populateFileInput };


/**
 * Socket IO
 *
 */
const { io } = require("socket.io-client");
const socket = io();

// _hyperscript will trigger `app:join_project` on the project view page.
// Use this event to instruct the server to put this socket client in the project 'room'
htmx.on(htmx.find('body'), 'app:join_project', (evt) => {
	let projectHash = evt.detail.project_hash;
	console.log(`Joining room for ${projectHash}`);
	socket.emit('join_project', projectHash);
});

// Listen for 'activity' events on the socket and send event to <body> for _hyperscript listeners
socket.on('activity', (params) => {
	htmx.trigger(htmx.find('body'), "new_activity", params);
});

// Listen for 'comments' events on the socket and send event to <body> for _hyperscript listeners
socket.on('comments', (params) => {
	htmx.trigger(htmx.find('body'), "new_comments", params);
});





// Get auth token form security from metadata
function getAuthToken() {
	return document.querySelector('meta[name="crumb"]').getAttribute('content');
}

// Configure htmx requests with form security.
document.body.addEventListener('htmx:configRequest', function(evt) {
	if (evt.detail.verb.toLowerCase() == 'get') return;
	evt.detail.parameters['crumb'] = getAuthToken();
});