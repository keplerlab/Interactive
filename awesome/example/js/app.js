
$(document).ready(function(){
	awesome.init({
		selector: 'img',
		offset : 100,
		landscape: true
	})

	$('#showhidden').click(function(){
		$('#hidden-images').show();
		awesome.reinit();
	});
	$('#showhidden').click(function(){
		$('#hidden-images').show();
		awesome.reinit();
	});

	$("#loadfromjson").click(function(){
		var source   = $('#images-template').html();
		var template = Handlebars.compile(source);
		var context={
			images:[	{
				"base":"http://placehold.it/",
                "x-large":"1500x200&text=json-x-large-image",
				"large":"1000x200&text=json-large-image",
				"medium":"700x200&text=json-medium-image",
				"small":"400x200&text=json-small-image",
                "small-landscape":"500x200&text=json-small-landscape-image",
                "x-large-retina":"1500x200&text=json-x-large-retina-image",
				"large-retina":"1000x200&text=json-large-retina-image",
				"medium-retina":"700x200&text=json-medium-retina-image",
				"small-retina":"400x200&text=json-small-retina-image",
                "small-landscape-retina":"500x200&text=json-small-landscape-retina-image"
			}]
		}
		var html = template(context);
		$('#imagesformjson').html(html);
		awesome.reinit();
	});

});
angular.module('app',[])
	.controller('loadImages',['$scope',function($scope){
		$scope.loadImages = function(){
			$scope.images= [
				"http://placehold.it/"
			];
		}
	}]);

angular.bootstrap(document,['ng.awesome','app']);

