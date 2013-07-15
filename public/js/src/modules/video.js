define([], function ()
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