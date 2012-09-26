
px.ReferrerParam = px.Param.extend({
    name: "ref",

    val: function() {
        return this._ifr() ? this._doc.referrer : "0";
    }
});
