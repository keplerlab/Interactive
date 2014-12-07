angular.module( 'ng.awesome', [] )
	.directive( 'ic', function () {
		return {
			link: function ( scope, elem, attrs ) {
				var data = JSON.parse(attrs.renditions);
				angular.forEach( data, function( value, key ) {
					elem.attr('data-'+key,value);
				} );
				if(elem.hasClass('bgimage')){
					awesome.checkBgLoad(elem[0]);
				}
				else{
					awesome.checkImageload(elem[0]);
				}
			}
		};
})


