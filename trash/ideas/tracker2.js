
var tracker = {
    v: "2.0",
    ep: "http://pixer.meaningtool.com/",
    _parms: {},

    url: function(opt) {
        return this.ep + opt.client + "/0/" + opt.action;
    },

    key: function(opt) {
        return opt.client + opt.action;
    },

    req: function() {
        var url = this.url() + "?" + this.qs();
        var im = new Image(1,1);

        im.onload = function(){};
        im.src = url;
    },

    qs: function() {
        var mods = this._parms
          , mod
          , qs = [];

        for (var modName in mods) {
            if (mods.hasOwnProperty(modName)) {
                mod = mods[modName];
                qs.push(mod.qs());
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
    reg: function(modClass) {
        var len = arguments.length, i = 0;

        if (len > 1) {
            for (; i<len; i++) {
                this.reg(arguments[i]);
            }
            return;
        }
        
        var mod = new modClass(this);

        this._params[mod.name] = mod;
    }
}

var VersionParam = Module.extend({ name: "v", val: tracker.v });
tracker.reg(VersionParam, IframeParam, ContentLangParam);


