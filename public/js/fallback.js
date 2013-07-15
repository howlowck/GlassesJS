if (typeof define === 'undefined') {
    var iRTC = {};
    define = function (name, req, callback) {
        if (name !== 'irtc') {
            iRTC[name] = callback.call(iRTC);
        } else {
            iRTC = callback.call(iRTC);
        }
    };
    require = {
        config: function () {}
    };
}