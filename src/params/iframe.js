
px.IframeParam = px.Param.extend({
    name: "ifr",
    val:  function() {
        return this._ifr() ? "1" : "0";
    }
});

