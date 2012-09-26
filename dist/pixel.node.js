module.exports = (function(ns, datans) {
    // Main Namespace
    var px = {};
    var wnd = this;

var ctor = function(){};
var extend = function(Parent) {

    return function(proto) {
        var child = function() { Parent.apply(this, arguments); };

        ctor.prototype = Parent.prototype;
        child.prototype = new ctor;
        child.prototype.constructor = child;

        for (var prop in proto) {
            if (proto.hasOwnProperty(prop)) {
                child.prototype[prop] = proto[prop];
            }
        }

        return child;
    }
}


/**
 * @class Module
 */
function Param() { }

Param.prototype = {
    name: null,

    _esc: this.encodeURIComponent || escape,
    _doc: this.document,
    _nav: this.navigator,
    _slf: this.self,
    _top: this.top,

    _metaTags: function() {
        return this._mtags || (this._mtags = this._doc.getElementsByTagName("meta"));
    },

    _ifr: function() {
        return this._slf != this._top;
    },

    val: function() {
        // Override
    },

    _val: function() {
        return typeof this.val == "function" ? this.val() : this.val;
    },

    qs: function() {
        var val = this._val();
        if (typeof val !== "string") return 0;
        return this.name + "=" + this._esc(val);
    }
}

Param.extend = extend(Param);
px.Param = Param;

px.IframeParam = px.Param.extend({
    name: "ifr",
    val:  function() {
        return this._ifr() ? "1" : "0";
    }
});


px.ContentLangParam = px.Param.extend({
    name: "clang",

    _htmlLang: function() {
        var el = this._doc.getElementsByTagName("html")[0], r = "";
        if (el && el.lang) {
            r = el.lang;
        }

        return r;
    },

    _metaLang: function() {
        var el, equiv, r = "";
        var i;
        var metaTags = this._metaTags();
        var len = metaTags.length;

        for (i=0; i<len; i++) {
            el = metaTags[i];
            equiv = el.httpEquiv;
            if (equiv && equiv.toLowerCase() === "content-language") {
                r = el.content || "";
                break;
            }
        }
        return r;
    },

    val: function() {
        return this._metaLang() || this._htmlLang();
    }
});


px.BrowserLangParam = px.Param.extend({
    name: "lang",
    val: function() {
        var nav = this._nav;

        return (nav && nav.language ? nav.language : 
                nav && nav.browserLanguage ? nav.browserLanguage  : 
                "-").toLowerCase();
    }
});

px.ForcedSegmentsParam = px.Param.extend({
    name: "seg",
    val: function() {
        if (wnd[datans]) {
            return wnd[datans].segments;
        }
    }
});


px.MetaKeywordsParam = px.Param.extend({
    name: "k",
    val: function() {
        var el, ret={}, i,
            metaTags = this._metaTags(),
            len = metaTags.length;

        for (i=0; i<len; i++) {
            el = metaTags[i];
            if (el.name && el.name.toLowerCase() == "keywords") {
                return el.content || "";
            }
        }
        return "";
    }
});

px.ReferrerParam = px.Param.extend({
    name: "ref",

    val: function() {
        return this._ifr() ? this._doc.referrer : "0";
    }
});
px.TimestampParam = px.Param.extend({
    name: "rid",
    val: function() {
        return (new Date().getTime()).toString();
    }
});


/**
 * @class Tracker
 */
function Tracker(options) {
    this.opt = options || {};
    this._params  = {};

    var VersionParam = Param.extend({ name: "v", val: this.v });

    // registering the VersionParam
    this.reg(VersionParam);

    // registering the rest of the Params
    this.reg.apply(this, this.params);
}

Tracker.prototype = {
    constructor: Tracker,
    v: "2.0",
    ep: "http://pixer.meaningtool.com/",

    params: [ px.IframeParam, px.ContentLangParam, px.BrowserLangParam, px.MetaKeywordsParam, px.ReferrerParam, px.ForcedSegmentsParam, px.TimestampParam ],

    url: function() {
        return this.ep + this.opt.client + "/0/" + this.opt.action;
    },

    // Builds the url and makes the request
    req: function() {
        var url = this.url() + "?" + this.qs();

        this._req(url);

        this._done = 1;
    },

    // Makes the request
    _req: function(url) {
        var im = new wnd.Image(1,1);
        im.onload = function(){};
        im.src = url;
    },

    done: function() {
        return !!this._done;
    },

    qs: function() {
        var mods = this._params
          , mod
          , val
          , qs = [];

        for (var modName in mods) {
            if (mods.hasOwnProperty(modName)) {
                mod = mods[modName];
                val = mod.qs();
                // if it returns a falsy value it will not be added to the qs
                val && qs.push(val);
            }
        }

        return qs.join("&");
    },

    /**
     * Registers param modules to the tracker
     *
     * @method reg
     * @api public
     */
    reg: function(ParamClass) {
        var len = arguments.length
          , i = 0;

        if (len > 1) {
            for (; i<len; i++) {
                this.reg(arguments[i]);
            }
            return;
        }
        
        var param = new ParamClass(this);

        this._params[param.name] = param;
    }
}

Tracker.extend = extend(Tracker);
px.Tracker = Tracker;

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

// adding px to the window (for testing purposes)
this.px = px;

    return px;
});
