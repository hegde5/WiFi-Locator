/**
 * Created by Vinay on 12/6/2016.
 */
(function () {

    angular
        .module("WifiLoc8rApp")
        .factory("SearchService", SearchService);


    function SearchService($http) {

        var appid = "bx6tusceypwTt4KP";
        var api = {
            searchByZipcode: searchByZipcode,
            searchByLocation: searchByLocation,
            searchByName: searchByName,
            getPlace: getPlace
        };
        return api;

        function searchByZipcode(zipcode)
        {
            return $http({
                method: 'GET',
                url: 'http://api.workfrom.co/places/postal/'+zipcode+
                                        "?" + "appid="+appid
            });
        }

        function searchByLocation(radius)
        {
            return $http({
                method: 'GET',
                url: 'http://api.workfrom.co/places/ll/'+latitude+','+longitude+
                "?" + "radius=" + radius + "&appid="+appid
            });
        }

        function searchByName(name)
        {
            return $http({
                method: 'GET',
                url: 'http://api.workfrom.co/places/name/'+name+
                "?" + "appid="+appid
            });
        }

        function getPlace(id)
        {
            return $http({
                method: 'GET',
                url: 'http://api.workfrom.co/places/'+id+
                "?" + "appid="+appid + "&dow="+(new Date()).getDay()
            });
        }

    }

})();