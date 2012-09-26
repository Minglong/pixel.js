var px;
if (typeof require !== "undefined") {
    var buster = require("buster");
    var loadPixel = require("./utils").loadPixel;

    px = loadPixel();
}

var manager = px.manager;
var noop = function() {}

buster.testCase("Manager Tests", {

    setUp: function() {
        // Data used by the manager to create trackers
        this.trackerData1 = { client: "client1", action: "hit" };
        this.trackerData2 = { client: "client2", action: "hit" };
    },

    "it correctly defined the manager": function() {
        assert.defined(manager);
        assert.equals(typeof manager.getTracker, "function");
    },

    "it identifies correctly valid tracker input data": function() {
        assert(manager.isProcesable(this.trackerData1));
        assert.equals(manager.isProcesable(undefined), false);
        assert.equals(manager.isProcesable({}), false);
        assert.equals(manager.isProcesable([]), false);
        assert.equals(manager.isProcesable({client: "1"}), false);
        assert.equals(manager.isProcesable({action: "1"}), false);
        assert.equals(manager.isProcesable(1), false);
        assert.equals(manager.isProcesable("client1"), false);
    },

    "it builds a key to identify the tracker": function() {
        var key = manager.key(this.trackerData1);

        assert.equals(key, "client1hit");
    },

    "it creates a new tracker": function() {
        var spy = this.spy(px, "Tracker");
        var tracker = manager.getTracker(this.trackerData1);

        assert(tracker instanceof px.Tracker);
        assert.calledOnce(spy);
        assert.equals(tracker.opt.client, "client1");
        assert.equals(tracker.opt.action, "hit");
        
        spy.restore();
    },

    "it doesn't create twice the same tracker": function() {
        var spy = this.spy(px, "Tracker");
        var tracker = manager.getTracker(this.trackerData1);
        var tracker2 = manager.getTracker(this.trackerData2);

        tracker = manager.getTracker(this.trackerData1);

        assert.calledTwice(spy);
        spy.restore();
    },

    "it runs the tracker (makes the request)": function() {
        var tracker = manager.getTracker(this.trackerData1);
        var tracker2 = manager.getTracker(this.trackerData2);

        // Stubbed the 'req' method because the jsdom version of 
        // the window had problems to read the 'Image' property.
        var stub = this.stub(tracker, "_req", noop);
        var stub2 = this.stub(tracker2, "_req", noop);

        manager.run(this.trackerData1);
        manager.run(this.trackerData1);
        manager.run(this.trackerData2);

        assert.calledOnce(stub);
        assert.calledOnce(stub2);
        assert(tracker.done());

        stub.restore();
        stub2.restore();
    },

    "it can load more than once the script and keep the manager's state": function() {

        // This test is only prepared for running in a node env
        if (typeof require === "undefined") {
            assert(1);
            return;
        }

        var tracker = manager.getTracker(this.trackerData1);
        var stub = this.stub(tracker, "_req", noop);
        var key = manager.key(this.trackerData1);

        manager.run(this.trackerData1);

        var px2 = loadPixel();

        assert.defined(px2.manager.trackers[key]);

        stub.restore();
    },

    tearDown: function() {
        manager.reset();
    }
});
