var wnd = require("./fixtures/index");
var _pixel = require("../dist/pixel.node");
//var px = _pixel.call(wnd, '_mt_', '_mtdata_');

module.exports = {
    getPixel: function() {
        return _pixel.call(wnd, '_mt_', '_mtdata_');
    },

    loadPixel: function() {
        return _pixel.call(wnd, '_mt_', '_mtdata_');
    },

    getWindow: function() {
        return wnd;
    }
}

