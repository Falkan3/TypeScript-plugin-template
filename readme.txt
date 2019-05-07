Required:
-----------------------------
npm install browserify -g
(npm install browserify-shim -- save)
-----------------------------
npm install typescript -g
-----------------------------
npm install tsify -g
-----------------------------
npm install uglify-js -g / uglify-es (old: uglifyjs)
-----------------------------

1. Compile new code:

browserify src/js/main.ts -p [ tsify ] > dist/js/bundle.js
||
browserify src/js/constructor.ts -p [ tsify ] > dist/js/constructor_bundle.js

======== OR ========

tsc

2. Minify:

uglifyjs dist/src/js/main.js -c > dist/src/js/bundle.min.js

3. Compile new code and minify (pipe through uglifyjs):

browserify src/js/main.ts -p [ tsify ] | uglifyjs > dist/js/bundle.min.js
||
browserify src/js/constructor.ts -p [ tsify ] | uglifyjs > dist/js/constructor_bundle.min.js

4. Transpile - use Babel to transpile JS to ES5

npx babel dist/js/bundle.js -o dist/js/bundle.normalized.js
npx babel dist/js/bundle.min.js | uglifyjs > dist/js/bundle.normalized.min.js

/**************************************************************************************************************/


1. Check if the correct environment file is being imported (default file imported is environment.example)