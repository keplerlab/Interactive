/*
hasClass implementation for JavaScript dom element
*/
Element.prototype.hasClass = function(className) {
    return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
};

/*
addClass implementation for JavaScript dom element
*/
Element.prototype.addClass = function(className) {

	if(!this.hasClass(className)){
		var eleClass = this.getAttribute( 'class' );
		eleClass = eleClass? eleClass+ ' '+className  : className;
		this.setAttribute( 'class', eleClass);
	}
};

/*
getData implementation for JavaScript dom element
*/
Element.prototype.getData = function(selector) {
	return this.getAttribute('data-'+ selector);
};

/*
setData implementation for JavaScript dom element
*/
Element.prototype.setData = function(selector,value) {
	return this.setAttribute('data-'+ selector,value);
};

/*
isvisible implementation for JavaScript dom element
same as jquery implementation
*/
Element.prototype.isvisible = function(){
	return this.offsetWidth > 0 && this.offsetHeight > 0;
}

/*
browser compatibility for event binding
*/
function bindEvent(ele,event,callback){
	if (ele.addEventListener) {
		ele.addEventListener(event, callback, false);
	}
	else {
		ele.attachEvent(event, callback);
	}
}

/*
forEach method for  document.querySelectorAll (NodeList)
*/
NodeList.prototype.forEach = Array.prototype.forEach;

var awesome = (function(  ){
	/*default settings*/
	var settings = {
			lazyLoadClass : 'lazyload',
			lth : 'lth',
			vp:{
				large: 1200,
				medium: 750,
				small: 320,
				xlarge: 1600
			},
			selector: 'img',
			offset : 300,
			defaultImage:'',
			retina : true,
			landscape: true,
			iframeSelector: 'iframe',
			bgselector: '.bgimage'
		}
		, calcOffset
		, bindEvents = false
		, pageLoaded =false
		, currentmedium
		, lastmedium
		, isRetina =false
		;

	/*
	* image imageHandler
	*
	*/
	var imageHandler =new function (){
		var self = this;
		/*
		* function: checkImages
		* get the all image and check for loading
		*
		*/
		this.checkImages = function(){
			var eles = document.querySelectorAll(settings.selector);
			eles.forEach(function(ele){
				self.bootstrap(ele);
			});

		}

		/*
		* function: bootstrap
		* i/p: javascript element as ele
		* checks for lazyload class and call check load function
		* otherwise load the image with condition image is not loaded
		*/
		this.bootstrap = function(ele) {
			if(ele.hasClass(settings.lazyLoadClass)){
				self.checkload(ele);
			}
			else if(ele.getData('loaded')  !== 'true'){
				self.loadImage(ele);
			}

		}
		/*
		* function: checkload
		* i/p: javascript element as ele
		* checks ele is already loaded, isvisible, not hi-res-img and wether ele is in viewport
		* if all conditions are true call  loadImage
		*/

		this.checkload = function( ele ){
			if( ele.getData('loaded')  !== 'true' && ele.isvisible() && !ele.hasClass('hi-res-img') &&  ele.getBoundingClientRect().top - calcOffset < 0 )
			{
				self.loadImage(ele);
			}
		}

		/*
		* function: loadImage
		* i/p: javascript element as ele
		* checks ele is having lowresolution to hiresolution identifier and call call handleLTH
		* else load the image and updated the statues of element with ele.setData('loaded',true);
		*/
		this.loadImage = function(ele){

			if(ele.hasClass(settings.lth))
			{
				self.handleLTH(ele);
			}
			else{
				if(!ele.hasClass('hi-res-img')){
					ele.setAttribute('src',(ele.getData('base')+ele.getData(settings.currentvp)) || ele.getData('src'));
					ele.setData('loaded',true);
				}
			}
		}

		/*
		* function: handleLTH
		* i/p: javascript element as ele
		* checks for page loaded,
		* if page loaded
		* load low-resolution and high-resolution image at the same time and as soon as high-resolution hide the low resolution image and hide update the status of element with  ele.setData('loaded',true);
		* else load the high-resolution
		*/
		this.handleLTH= function(ele){
			var src
				, hisrc
				;
			if(isRetina){
				src = ele.getData('base')+ele.getData(currentmedium);
			}
			else{
				src = (ele.getData('base')+ele.getData(settings.currentvp));
			}
			if(pageLoaded){
				var hiEle = document.createElement('img');
				hiEle.addClass('hi-res-img');
				ele.setAttribute( 'src', src );
				if(isRetina){
					hisrc = ele.getData('base')+ele.getData(settings.currentvp);
				}
				else{
					hisrc = ele.getData('base')+ele.getData(settings.currentvp + '-hi');
				}

				bindEvent(hiEle,"load",function(){
					ele.addClass('hide');
					hiEle.addClass('show');
				});
				ele.parentNode.insertBefore(hiEle, ele.nextSibling);
				hiEle.setAttribute('src',hisrc);
                if(!ele.hasClass('lazyload')){
                ele.setAttribute( 'src', hisrc );
                }
				ele.setData('loaded',true);
			}
			else{

				ele.setAttribute('src',src);
			}
		}
	}

	/*
	* image iframeHandler
	*/
	var iframeHandler = new function(){
		var self = this;

		/*
		* function: checkIframes
		* i/p:
		* select all iframes using iframeSelector
		* for each iframe element call checkIframeLoad
		*/
		this.checkIframes= function(){
			var  eles = document.querySelectorAll(settings.iframeSelector);

			eles.forEach(function(ele) {
				self.checkIframeLoad(ele);
			});
		}

		/*
		* function: checkIframeLoad
		* i/p: javascript element as ele
		* checks ele is already loaded, isvisible, not hi-res-img and wether ele is in viewport
		* if conditions satisfy update the src of iframe and updpate the status ele.setData("loaded",true);
		*/
		this.checkIframeLoad =function(ele){
			if( ele.getData('loaded')  !== 'true' && ele.isvisible()  && ele.getBoundingClientRect().top - calcOffset < 0)
			{
				ele.setAttribute("src",ele.getData("src"));
				ele.setData("loaded",true);
			}
		}
	}

	/*
	* image backgroundImgHandler
	*/

	var backgroundImgHandler = new function(){

		var self = this;

		/*
		* function: checkBgImages
		* i/p:
		* select all elements  using settings.bgselector
		* for each  element call bootstrapbgImages
		*/
		this.checkBgImages= function(){
			var eles = document.querySelectorAll(settings.bgselector);
			eles.forEach(function(ele){
				self.bootstrapbgImages(ele);
			});
		}


		/*
		* function: bootstrapbgImages
		* i/p: javascript element as ele
		* checks ele is has settings.lazyLoadClass class call checkBgLoad method
		* else call loadBgImage method
		*/
		this.bootstrapbgImages = function(ele) {
			if(ele.hasClass(settings.lazyLoadClass)){
				self.checkBgLoad(ele);
			}
			else if(ele.getData('loaded')  !== 'true'){
				self.loadBgImage(ele)
			}

		}

		/*
		* function: loadBgImage
		* i/p: javascript element as ele
		* if element has data-src attribute update background image with data-src
		* otherwise update the src with ele.getData("base")+ele.getData(settings.currentvp)
		* update the satus of the element
		*/
		this.loadBgImage= function(ele){
			if(ele.getData('src')){
				ele.style.backgroundImage= 'url('+ele.getData("src")+')';
			}
			else{
				ele.style.backgroundImage= 'url('+ele.getData("base")+ele.getData(settings.currentvp)+')';
			}
			ele.setData('loaded',true);

		}

		/*
		* function: checkBgLoad
		* i/p: javascript element as ele
		* if element has data-src attribute update background image with data-src
		* checks ele is already loaded, isvisible and ele is in viewport
		* update the status of the element
		*/
		this.checkBgLoad =function(ele){
			if( ele.getData('loaded')  !== 'true' && ele.isvisible()   && ele.getBoundingClientRect().top - calcOffset < 0)
			{
				self.loadBgImage(ele);
			}
		}
	}

	/*
	* function: init
	* i/p: user-settings object  as userSettings
	* update the default setting with userSettings
	*/

	var init= function( userSettings ){
		for(var key in userSettings) {
			settings[key] = userSettings[key];
		}
		/*bind window event only once with check condition bindEvents*/
		if(!bindEvents){
			bindWindowEvents();
			bindEvents = true;
		}

		/*call initial functions */
		initialize();
		//checkImages();
		imageHandler.checkImages();
		iframeHandler.checkIframes();
		backgroundImgHandler.checkBgImages();
	}


	/*
	* function: initialize
	* i/p:
	* calculate calcOffset
	* identify current-view port in settings.currentvp
	* identify last view port in lastmedium
	* for first time settings.currentvp and lastmedium are same.
	*/

	var initialize = function(){
		var width = window.innerWidth
			;
		calcOffset = window.innerHeight +  settings.offset
		if( width >= settings.vp.xlarge )
		{
			settings.currentvp = 'xlarge';

		}
		else if( width >= settings.vp.large )
		{
			settings.currentvp = 'large';

		}
		else if(width >= settings.vp.medium)
		{
			settings.currentvp = 'medium';

		}
		else{
			settings.currentvp = 'small';
			if( settings.landscape && window.innerHeight < window.innerWidth ){
				settings.currentvp += '-landscape';
			}
		}
		if(currentmedium){
			lastmedium = currentmedium;
		}
		currentmedium = settings.currentvp;
		if(!lastmedium){
			lastmedium = currentmedium;
		}

		if(window.devicePixelRatio >= 2 ){

			isRetina = true;
			if(settings.retina){
				settings.currentvp += '-retina';
			}
		}
	}

 	/*
	* function: bindWindowEvents
	* i/p:
	* bind scroll,resize and assign callback
	*/
	var bindWindowEvents= function (){

		/*
		* onscroll call imageHandler.checkload,
		* backgroundImgHandler.checkBgLoad,
		* iframeHandler.checkIframeLoad
		* with respective JavaScript elements
		*/
	    bindEvent(window,"scroll",function(){

			var eles = document.querySelectorAll(settings.selector);
			eles.forEach(function(ele){
				imageHandler.checkload(ele)
			});

			eles = document.querySelectorAll(settings.bgselector);
			eles.forEach(function(ele){
				backgroundImgHandler.checkBgLoad(ele);
			});

			eles = document.querySelectorAll(settings.iframeSelector);
			eles.forEach(function(ele){
				iframeHandler.checkIframeLoad(ele);
			});
		});

		/*
		* onresize call
		* if viwport is changed
		* set the default image for images
		* remove the background image for  bgselector
		* and remove the hi-res-img as part of  low-resolution to high-resolution implementation
		* and call init
		*/
		bindEvent(window,"resize",function(){
			initialize();
			if(lastmedium !== currentmedium){
				document.querySelectorAll(settings.selector+":not([data-src])").forEach(function(ele){
					ele.setAttribute('src',settings.defaultImage);
					ele.setData('loaded',false);
				});
				document.querySelectorAll(settings.bgselector+":not([data-src])").forEach(function(ele){
					ele.style.backgroundImage = '';
					ele.setData('loaded',false);
				});
				document.querySelectorAll('.hi-res-img').forEach(function(ele){
					ele.parentNode.removeChild(ele);
				});
				init();
			}
		});

		/*
		* onload of the window
		* update the winodw loaded identifier with pageLoaded
		* call imageHandler.checkload(ele) with each ele (element with low-resolution to high-resolution image implantation)
		*/
		bindEvent(window,"load",function(){
			pageLoaded = true;
			document.querySelectorAll(settings.selector+".lth").forEach(function(ele){
				imageHandler.checkload(ele);
			});
		});
	}


	/*
		return object to awesome
	*/
	return {
		reinit: imageHandler.checkImages,
		init : init,
		reinitIframe: iframeHandler.checkIframes,
		reinitBgImages: backgroundImgHandler.checkBgImages,
		checkImageload : imageHandler.checkload,
		checkBgLoad : backgroundImgHandler.checkBgLoad
	}
})();

