require.config({
    paths: {
        'irtc': './../../dist/irtc'
    }
});
require(['irtc'], function (iRTC) {
    camera = iRTC.create('camera');
    camera.is('#vid');
    canvas = iRTC.create('canvas');
    canvas.is('canvas', camera);
});