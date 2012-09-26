
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
