wnd = global.window;
;(function() {
console.log(this);
console.log(this.navigator);

/**
 * @class Module
 */
function Module() {

}

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

        // adding version qs param
        qs.push("v=" + this.v);

        return qs.join("&");
    },

    mod: function(modClass) {
        this._mods.push(new modClass);
    }
}


var IsIframe = Module.extend({
    name: "ifr",
    val:  function() {
        return this._slf != this._top;
    }
});


var TestModule = Module.extend({
    name: "test",

    val: function() {
        return "test_string";
    }
});

var _exports = {
    Module: Module,
    Tracker: Tracker,
    IsIframe: IsIframe
};                

if ( typeof exports !== "undefined") {
    module.exports = _exports;
} else {
    window.Module = Module;
    window.Tracker = Tracker;
    window.IsIframe = IsIframe;
}
}).call(global.window);
