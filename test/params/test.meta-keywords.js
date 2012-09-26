var px;
if (typeof require !== "undefined") {
    var buster = require("buster");
    var loadPixel = require("../utils").loadPixel;
    px = loadPixel();
}

// Tests

buster.testCase("Meta Keywords Param Tests", {

    "it must not be within an iframe": function() {
        var param = new px.MetaKeywordsParam;

        assert.equals(param.val(), "cat, dog");
    }

});
