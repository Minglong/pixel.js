

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
