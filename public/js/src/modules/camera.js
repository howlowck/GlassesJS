define(['video', 'helpers', 'events'], function (Video, Helpers, Events)
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
