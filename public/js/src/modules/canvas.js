define(['helpers', 'events'], function (Helpers, Events)
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