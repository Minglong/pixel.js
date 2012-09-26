px.TimestampParam = px.Param.extend({
    name: "rid",
    val: function() {
        return (new Date().getTime()).toString();
    }
});

