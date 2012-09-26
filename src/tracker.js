
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

