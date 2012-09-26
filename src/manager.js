// if no namespace has been defined
if (typeof this[ns] == "undefined") {
    // creating namespace
    this[ns] = {};

    px.manager = {
        trackers: {},
        getTracker: function(options) {
            var key = this.key(options);
            var tracker = this.trackers[key];

            if (!tracker && this.isProcesable(options)) {
                tracker = new px.Tracker(options);
                this.trackers[key] = tracker;
            }

            return tracker;
        },

        run: function(trackerOptions) {
            //if (!this.isProcesable(trackerOptions)) {
            //    return;
            //}

            var tracker = this.getTracker(trackerOptions);

            if (tracker && !tracker.done()) {
                tracker.req();
            }
        },

        key: function(trackerOptions) {
            return trackerOptions.client + trackerOptions.action;
        },

        isProcesable: function(data) {
            return !!(typeof data === "object" && data.client && data.action);
        },

        reset: function() {
            this.trackers = {};
        }
    }

    this[ns].manager = px.manager;
} else {
    px.manager = this[ns].manager;
}

px.run = function() {
    px.manager.run(this[datans]);
}
