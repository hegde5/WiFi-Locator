/**
 * Created by Vinay on 12/6/2016.
 */
(function () {

    angular
        .module("WifiLoc8rApp")
        .factory("SearchService", SearchService);


    function SearchService($http) {

        var api = {
            searchByZipcode: searchByZipcode
        }
        return api;

        function searchByZipcode(zipcode)
        {
            var appid = "bx6tusceypwTt4KP";
            //console.log("jeeya jeeya" + zipcode);
            return $http({
                method: 'GET',
                url: 'http://api.workfrom.co/places/postal/'+zipcode+
                                        "?" + "appid="+appid,
                // data: {
                //     appid: 'bx6tusceypwTt4KP'
                // }
            });

        }

    }

})();