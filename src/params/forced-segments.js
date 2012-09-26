
px.ForcedSegmentsParam = px.Param.extend({
    name: "seg",
    val: function() {
        if (wnd[datans]) {
            return wnd[datans].segments;
        }
    }
});
