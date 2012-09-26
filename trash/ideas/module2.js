
/**
 * @class Module
 */
function Module(tracker) {
    this.tracker = tracker;
}

Module.prototype = {
    name: null,

    _esc: this.encodeURIComponent || escape,
    _doc: this.document,
    _nav: this.navigator,
    _slf: this.self,
    _top: this.top,

    _metaTags: function() {
        return this._mtags || (this._mtags = this._doc.getElementsByTagName("meta"));
    },

    val: function() {
        // Override
    },

    _val: function() {
        return this._cached || (this._cached = typeof this.val == "function" ? this.val() : this.val);
    },

    qs: function() {
        return this.name + "=" + this._esc(this._val());
    }
}

Module.extend = extend(Module);
