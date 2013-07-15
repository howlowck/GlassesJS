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

define('video',[], function ()
    {
        var Video = {
            start: function (selector, stream) {
                var video = this.video = document.querySelector(selector);
                if (window.webkitURL) {
                    videoSource = window.webkitURL.createObjectURL(stream);
                } else {
                    videoSource = window.URL.createObjectURL(stream);
                }
                video.autoplay = true;
                video.src = videoSource;
                return video;
            }
        }
        return Video;
    }
);
define('helpers',[], function ()
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
define('events',[], function ()
    {
        var Events = {
            _events: {},
            on : function (name, callback, ctx) {
                var events = this._events[name] || (this._events[name] = []);
                events.push({callback: callback, context: ctx || this});
                return this;
            },
            trigger: function (eventName, payload, ctx) {
                console.log('triggered ' + eventName);
                var events = this._events[eventName],
                    i = 0,
                    length = events ? events.length : 0;
                while (i < length) {
                    events[i].callback.call(events[i].context, payload);
                    i++;
                }
                return;
            }
        };

        return Events;
    }
);
define('camera',['video', 'helpers', 'events'], function (Video, Helpers, Events)
    {
        if (arguments.length === 0) {
            var Video = this.video;
            var Helpers = this.helpers;
            var Events = this.events;
        }
        var Camera = {
            type: 'camera',
            is: function (selector, width, height) {
                var ins = this;
                navigator.getUserMedia ||
                (navigator.getUserMedia = navigator.mozGetUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.msGetUserMedia);

                this.getStream = function () {
                    return ins.stream;
                }
                this.getVideo = function () {
                    return ins.video;
                }
                if (navigator.getUserMedia) {
                    console.log('congrats, you have getUserMedia!');
                    navigator.getUserMedia({video: true}, function (stream) {
                        ins.stream = stream;
                        ins.video = Video.start(selector, stream, width, height);
                        ins.trigger('hasVideo', {video: ins.video, origin: ins});
                    }, function () {
                        console.log("it failed!");
                    });
                } else {
                    alert('Camera Feature is not supported in this browser.');
                }
            }
            
        }
        Camera = Helpers.extend(Camera, Events);
        return Camera;
    }
);

define('canvas',['helpers', 'events'], function (Helpers, Events)
    {
        if (arguments.length === 0) {
            var Helpers = this.helpers;
            var Events = this.events;
        }
        var Canvas = {
            isPlaying: false,
            width: 0,
            height: 0,
            is: function (selector, connection) {
                this.sourceCtx = document.querySelector(selector).getContext('2d');
                if (typeof connection !== 'undefined') {
                    this.on('hasVideo', function (payload) {
                        if (connection == payload.origin) {
                            this.createVideoStream(payload.video);
                        } else {
                            console.log('not it!');
                        }
                    });
                }
            },
            createVideoStream: function (video) {
                this.video = video;
                this.width = video.width;
                this.height = video.height;
                this.drawImage();
                this.start();
                return this.getImage();
            },
            drawImage: function () {
                this.sourceCtx.drawImage(this.video, 0, 0, this.video.width, this.video.height);
            },
            getImage: function () {
                return this.sourceCtx.getImageData(0, 0, this.video.width, this.video.height);
            },
            play: function (interval) {
                var ins = this;
                return setInterval(function () {
                    if (ins.isPlaying) {
                        ins.drawImage();
                    }
                }, interval);
            },
            stop: function () {
                this.isPlaying = false;
                window.clearInterval(this.playing);
            },
            start: function (interval) {
                if (typeof interval === 'undefined') {
                    interval = 15;
                };
                this.isPlaying = true;
                this.playing = this.play(15);
            }
        };
        Canvas = Helpers.extend(Canvas, Events);
        return Canvas;
    }
);
require.config({
    baseUrl: 'public/js/src/modules'
});
define('irtc',['camera', 'canvas'], function (Camera, Canvas)
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