app.factory('dataFactory',function($http){
    return {
        getData:  function(url){
        	return $http.get(url)
        },
        sendData: function(url,config){
            return $http.post(url,config)
        }
    };
});