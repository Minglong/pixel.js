
PARAMS = src/params/iframe.js src/params/content-lang.js src/params/browser-lang.js src/params/forced-segments.js src/params/meta-keywords.js src/params/referrer.js src/params/timestamp.js
BASE = src/utils.js src/param.js $(PARAMS) src/tracker.js src/manager.js 
SRC = src/wrappers/start-browser.js $(BASE) src/main.js src/wrappers/end-browser.js
SRC_TEST_BROWSER = src/wrappers/start-browser.js $(BASE) src/wrappers/exports.js src/wrappers/end-browser.js
SRC_TEST_NODE = src/wrappers/start-node.js $(BASE) src/wrappers/exports.js src/wrappers/end-node.js

pixel.js: $(SRC)
	cat $^ > dist/$@

pixel.min.js: dist/pixel.js
	./node_modules/.bin/uglifyjs --no-mangle $< > dist/$@

pixel.browser.js: $(SRC_TEST_BROWSER)
	cat $^ > dist/$@

pixel.node.js: $(SRC_TEST_NODE)
	cat $^ > dist/$@

build:
	make pixel.js
	make pixel.min.js
	make pixel.node.js
	make pixel.browser.js

serve:
	node ./node_modules/.bin/serve .

test:
	./node_modules/.bin/buster test -c test/buster.node.js

test-phantom:
	phantomjs ./node_modules/buster/script/phantom.js &

test-static:
	./node_modules/.bin/buster static -c test/buster.browser.js

serve-tests:
	./node_modules/.bin/buster server

test-browser:
	./node_modules/.bin/buster test -c test/buster.browser.js

.PHONY: test
