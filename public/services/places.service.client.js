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
            searchByName: searchByName
        };
        return api;

        function searchByZipcode(zipcode)
        {
            //console.log("jeeya jeeya" + zipcode);
            return $http({
                method: 'GET',
                url: 'http://api.workfrom.co/places/postal/'+zipcode+
                                        "?" + "appid="+appid
                // data: {
                //     appid: 'bx6tusceypwTt4KP'
                // }
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

    }

})();