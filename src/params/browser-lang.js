
px.BrowserLangParam = px.Param.extend({
    name: "lang",
    val: function() {
        var nav = this._nav;

        return (nav && nav.language ? nav.language : 
                nav && nav.browserLanguage ? nav.browserLanguage  : 
                "-").toLowerCase();
    }
});
