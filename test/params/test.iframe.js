var px;
if (typeof require !== "undefined") {
    var buster = require("buster");
    var loadPixel = require("../utils").loadPixel;
    px = loadPixel();
}

// Tests

buster.testCase("Iframe Param Tests", {

    "it must not be within an iframe": function() {
        var param = new px.IframeParam;

        assert(param.val() == "0" || param.val() == "1");
    }

});
