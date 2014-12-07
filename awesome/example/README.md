<h3>Explanation and sample usage</h3>
----------------------------------
<ul>
<li>The example contains demo of all possible combinations which we can do with this library. Retina, landscape both the flags are turned on.Check it out. Different images have been used to highlight the different usecases.</li>
<li>The example also highlights displaying hidden images, how lazy loaded through reinit functions, angular example and dynamic image paths received through JSON and handlebar templating.</li>
<li>For low res to high res, the library will automatically load the retina images (if retina option is enabled) and for non retina it will load the high resolution images for corresponding viewports. </li>
<li>The vendor libraries are just used for example. The awesome js doesnt depend on them.</li>
</ul>

<h4>Completely customizable options and any of the default params can be overridden </h4>
```javascript
var settings = {
			lazyLoadClass : 'lazyload', //the lazy load class that needs to be added to img or div for lazyloading of images. 
			lth : 'lth', // the low res to high res class that needs to be added if you need that functionality
			vp:{
				large: 1200, // large Viewport value
				medium: 750, // Medium viewport value
				small: 320,  // small viewport value
				xlarge: 1600 // Extra large viewport value
			},
			selector: 'img',  // image selector
			offset : 300,     // Lazy load offset. This determines how much pixel before the images to be loaded and ready when you scroll
			defaultImage:'', // default image value
			retina : true, // retina support flag
			landscape: true, // small viewport landscape support flag
			iframeSelector: 'iframe', //Iframe selector
			bgselector: '.bgimage' // Background image selector class
		}
		, calcOffset
		, bindEvents = false
		, pageLoaded =false
		, currentmedium
		, lastmedium 
		, isRetina =false // Check for Retina
		;
```
<h4>How to override in your application script</h4>
```javascript
awesome.init({
		selector: 'img',
		offset : 100,
		retina: false
	})
```


------------------------------------------------------------------