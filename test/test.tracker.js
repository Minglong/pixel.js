var px;
if (typeof require !== "undefined") {
    var buster = require("buster");
    var loadPixel = require("./utils").loadPixel;

    px = loadPixel();
}

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

var TestTracker = px.Tracker.extend({
    ep: "/pixer",
    params: [ TestParam, TestParam2 ],
    _req: function(url) {}
});

buster.testCase("Tracker Tests", {
    setUp: function() {
        this.tracker = new px.Tracker({ client: "boobox", action: "hit" });
        this.testTracker = new TestTracker({ client: "boobox", action: "hit" });
    },

    "it correctly exported the Tracker object": function() {
        assert.defined(px.Tracker);
        assert.equals(typeof px.Tracker, "function");
    },

    "it registered the initial params": function() {
        var params = this.tracker._params;
        var name1 = px.IframeParam.prototype.name;
        var name2 = px.BrowserLangParam.prototype.name;
        var name3 = px.ContentLangParam.prototype.name;

        assert.defined(params[name1]);
        assert.defined(params[name2]);
        assert.defined(params[name3]);
    },

    "it correctly builds the url": function() {
        var url = "http://pixer.meaningtool.com/boobox/0/hit";

        assert.equals(this.tracker.url(), url);
    },

    "it correctly builds the querystring": function() {
        var qs = this.testTracker.qs();

        assert(qs.indexOf("test=val") !== -1);
        assert(qs.indexOf("test2=val2") !== -1);
    },

    "it correctly registers a param": function() {
        var TestParam = px.Param.extend({ name: "x", val: "y" });
        this.testTracker.reg(TestParam);

        assert(this.testTracker._params.x instanceof TestParam);
    },

    "it makes a request to the endpoint": function() {
        var spy = this.spy(this.testTracker, "_req");

        this.testTracker.req();

        assert.calledOnce(spy);
        spy.restore();
    }
})
