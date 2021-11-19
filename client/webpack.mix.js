let mix = require('laravel-mix');
let Path = require('path');

mix.setPublicPath('../server/public');

let outPath = '../server/public';

let outFilename = function(filename) {
	if ( ! mix.inProduction()) return filename;
	const parts = filename.split('.');
	const ext = parts.pop();
	return filename.replace(`.${ext}`, `.min.${ext}`);
	// const basename = filename.replace(`.${ext}`, '');
	// return [basename, 'min', ext].join('.');
}

// App
//
mix.sass('css/main.scss', Path.join(outPath, outFilename('main.css')));
mix.js('js/main.js', Path.join(outPath, outFilename('main.js')));

// HTMX + Hyperscript
let htmxbundle = [
	'node_modules/hyperscript.org/dist/_hyperscript.js',
	'node_modules/htmx.org/dist/htmx.js',
];
mix.scripts(htmxbundle, Path.join(outPath, outFilename('htmxbundle.js')));
