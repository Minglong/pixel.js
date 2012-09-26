
var px, wnd = this;
if (typeof require !== "undefined") {
    var buster = require("buster");
    var utils = require("./utils");
    px = utils.loadPixel();
    wnd = utils.getWindow();
}

buster.testCase("Pixel Namespace", {

    "it sets the right namespace": function() {
        assert.defined(wnd._mt_);
    },

    "it exposes the tracker manager": function() {
        assert.defined(wnd._mt_.manager);
    }
});
