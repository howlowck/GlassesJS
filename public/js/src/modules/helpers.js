define([], function ()
    {
        var Helpers = {
            extend: function () {
                var output = {};
                for (var i = arguments.length - 1; i >= 0; i--) {
                    var source = arguments[i];
                    if (source) {
                        for (var prop in source) {
                            output[prop] = source[prop];
                        }
                    }
                }
                return output;
            }
        };
        return Helpers;
    }
);