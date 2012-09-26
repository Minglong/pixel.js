
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

