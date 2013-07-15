require.config({
    baseUrl: 'public/js/src/modules'
});
define(['camera', 'canvas'], function (Camera, Canvas)
    {
        if (arguments.length === 0) {
            this.exp = true;
            var Camera = this.camera;
            var Canvas = this.canvas;
        }
        var IRTC = function () {
            this._modules = {
                'camera' : Camera,
                'canvas' : Canvas
            };
            this.create = function (module) {
                var ins = this;
                if (! this._modules.hasOwnProperty(module)) {
                    throw 'There is no such module name!';
                }
                if (Object.create) {
                    return Object.create(this._modules[module]);
                } else {
                    var dummy = function () {
                        return ins._modules[module];
                    };
                    return dummy();
                }
            };
        };
        return new IRTC();
    }
);