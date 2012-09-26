var px;
if (typeof require !== "undefined") {
    var buster = require("buster");
    var utils = require("./utils");

    px = utils.loadPixel();
}

// Helpers 

var TestParam = px.Param.extend({
    name: "test",
    val: function() {
        return "val";
    }
});

var TestParam2 = px.Param.extend({
    name: "test2",
    val: function() {
        return "val2";
    }
});

// Tests

buster.testCase("Param Tests", {
    setUp: function() {
        this.param1 = new TestParam;
        this.param2 = new TestParam2;
    },

    "it correctly extends the base Param": function() {
        var param = this.param1;

        assert.defined(param._doc);
        assert.defined(param._esc);
        assert.defined(param._nav);
        assert.defined(param._slf);
        assert.defined(param._top);

        assert.isFunction(param.val);
        assert.isFunction(param.qs);
    },

    "returns query string": function() {
        assert.equals(this.param1.qs(), "test=val");
        assert.equals(this.param2.qs(), "test2=val2");
    }
});
