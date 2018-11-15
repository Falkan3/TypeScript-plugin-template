Required:
npm install typescript
npm install browserify
npm install uglifyjs
npm install tsify

1. Compile new code:

browserify src/js/main.ts -p [ tsify ] > dist/src/js/bundle.js

OR

tsc

2. Minify:

uglifyjs dist/src/js/main.js -c > dist/src/js/bundle.min.js

3. Compile new code and minify (pipe through uglifyjs):

browserify src/js/main.ts -p [ tsify ] | uglifyjs > dist/src/js/bundle.min.js