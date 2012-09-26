
var ctor = function(){};
var extend = function(Parent) {

    return function(proto) {
        var child = function() { Parent.apply(this, arguments); };

        ctor.prototype = Parent.prototype;
        child.prototype = new ctor;
        child.prototype.constructor = child;

        for (var prop in proto) {
            if (proto.hasOwnProperty(prop)) {
                child.prototype[prop] = proto[prop];
            }
        }

        return child;
    }
}

