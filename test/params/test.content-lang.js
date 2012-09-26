var px;
if (typeof require !== "undefined") {
    var buster = require("buster");
    var loadPixel = require("../utils").loadPixel;

    px = loadPixel();
}

// Tests

buster.testCase("Content Language Param Tests", {

    "it must read the correct language from the html content": function() {
        var param = new px.ContentLangParam;

        assert.equals(param._htmlLang(), "en");
        assert.equals(param._metaLang(), "es");
        assert.equals(param.val(), "es");
        assert.equals(param.qs(), "clang=es");
    }

});
