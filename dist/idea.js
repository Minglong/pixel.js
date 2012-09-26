;(function() {

/**
 * @class Module
 */
function Module(tracker) { }

Module.prototype = {
    name: null,

    _esc:  this.encodeURIComponent || escape,
    _doc: this.document,
    _nav: this.navigator,
    _slf: this.self,
    _top: this.top,

    val: function() {
        // Override
    },

    qs: function() {
        return this.name + "=" + this._esc(this.val());
    }
}

Module.extend = function(proto) {
    function Child() {};
    Child.prototype = new Module;
    Child.prototype.constructor = Child;

    for (var prop in proto) {
        if (proto.hasOwnProperty(prop)) {
            Child.prototype[prop] = proto[prop];
        }
    }

    return Child;
}

/**
 * @class Tracker
 */
function Tracker(endpoint, options) {
    this._ep = endpoint;
    this._opt = options;
    this._mods  = [];
}

Tracker.prototype = {
    constructor: Tracker,
    v: "2.0",

    url: function() {
        return this._ep;
    },

    req: function() {
        var url = this.url() + "?" + this.qs();

        console.log("request made to: " + url);
    },

    qs: function() {
        var i=0
          , len=this._mods.length
          , mod
          , qs = [];

        for (; i<len; i++) {
            mod = this._mods[i];
            qs.push(mod.qs());
        }

        return qs.join("&");
    },

    mod: function(modClass) {
        var mod = new modClass(this);
        this._mods.push(mod);
    }
}


var IframeModule = Module.extend({
    name: "ifr",
    val:  function() {
        return this._slf != this._top;
    }
});


var TrackerVersion = Module.extend({
    name: "v",
    val:  function() {
        return this.t.v;
    }
});


var ContentLangModule = Module.extend({
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

    _metaTags: function() {
        return this._mtags || (this._mtags = this._doc.getElementsByTagName("meta"));
    },

    val: function() {

        return this._metaLang() || this._htmlLang();
    }
});


var BrowserLangModule = Module.extend({
    name: "lang",
    val: function() {
        var nav = this._nav;

        return (nav && nav.language ? nav.language : 
                nav && nav.browserLanguage ? nav.browserLanguage  : 
                "-").toLowerCase();
    }
});

var provider = new ObjectDataProvider; // QueryStringDataProvider
var data = provider.getData();
var clients = this.__mtt = {};

if (clients && !clients[data.client]) {
    var tracker = new Tracker("http://pixer.meaningtool.com/hit", data);
    tracker.mod(IframeModule, ContentLangModule, BrowserLangModule);
    clients[data.client] = tracker;

    tracker.req();
}

}).call(this);
