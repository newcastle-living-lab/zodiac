let mix = require('laravel-mix');
let Path = require('path');

mix.setPublicPath('../server/public');

let outPath = '../server/public';

// App
//
mix.sass('css/main.scss', outPath);
mix.js('js/main.js', outPath);

// HTMX + Hyperscript
let htmxbundle = [
	'node_modules/hyperscript.org/dist/_hyperscript.js',
	'node_modules/htmx.org/dist/htmx.js',
];
mix.scripts(htmxbundle, Path.join(outPath, 'htmxbundle.js'));
