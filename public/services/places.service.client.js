/**
 * Created by Vinay on 12/6/2016.
 */
(function () {

    angular
        .module("WifiLoc8rApp")
        .factory("PlaceService", PlaceService);


    function PlaceService($http) {

        var appid = "bx6tusceypwTt4KP";
        var api = {
            searchPlacesByZipcode: searchPlacesByZipcode,
            searchPlacesByLocation: searchPlacesByLocation,
            searchPlacesByName: searchPlacesByName,
            getPlace: getPlace,
            getPlaceByPlaceId : getPlaceByPlaceId

        };
        return api;

        function searchPlacesByZipcode(zipcode)
        {
            return $http({
                method: 'GET',
                url: 'http://api.workfrom.co/places/postal/'+zipcode+
                                        "?" + "appid="+appid
            });
        }

        function searchPlacesByLocation(latitude,longitude,radius)
        {
            return $http({
                method: 'GET',
                url: 'http://api.workfrom.co/places/ll/'+latitude+','+longitude+
                "?" + "radius=" + radius + "&appid="+appid
            });
        }

        function searchPlacesByName(name)
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

        function getPlaceByPlaceId(placeId) {
            var url = "/api/place/" + placeId;
            return $http.get(url);
        }

    }

})();