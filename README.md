# iRTC
iRTC is a wrapper library that helps you to easily and quickly access webRTC and getUserMedia.  It has AMD and regular global.

## Get Started
Include the library:
```HTML
<script src=".../path/to/irtc.js" ></script>
```
In your HTML:
```HTML
<video id="camfeed" width="320" height="240"></video>
<canvas id="image" width="320" height="240"></canvas>
```
In your Javascript:
```Javascript
var camera = iRTC.create('camera');
camera.is('#camfeed');
var canvas = iRTC.create('canvas', camera);
canvas.is('#image');
```
That's it!

### if you prefer AMD with RequireJS
In your main.js:
```Javascript
require.config({
    paths: {
        'irtc': 'path/to/dist/irtc'
    }
});
```
then simply require it like so...
```Javascript
require(['irtc'], function (iRTC) {
    // Your Code
}
```
Notice you are including the same file... how cool is that? :)

## Basic API
To start any module, you'll call ```create()```, and it will return an object.  For example, if you want a camera, call ``` iRTC.create('camera') ```
### Camera
Camera also includes the video element.  
#### Camera.is(selector)
So, if you have a DOM ```<video id="cam" width="320" height="240"></video>```.
You just have to call 
```Javascript
var camera = iRTC.create('camera').is("#cam");
``` 
to start the camera and see the feed in the video element.
#### Camera.getStream()
Once you have the getUserMedia, you can get the stream using this method.

### Canvas
With canvas, you gain access to the pixel level details neccessary for more advanced image manipulation
#### Canvas.is(selector, connection)
To specify with camera you want to canvas to connect to, specify the connection like this... 
```Javascript
// with a canvas id="image" and a camera iRTC object called 'cam'
var canvas = iRTC.create('canvas').is('#image', cam);
```
#### Canvas.getImage()
Once you have the canvas image, you can simply access the image data with this method.