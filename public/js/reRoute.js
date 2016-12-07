/**
 * Created by Vinay on 12/6/2016.
 */
(function () {
    angular
        .module("WifiLoc8rApp")
        .factory('DisableSSL', function ($location, $window) {
            return {
                activate: function () {
                    if ($location.protocol() !== 'http') {
                        $window.location.href = $location.absUrl().replace('https', 'http');
                    }
                }
            };
        })
})();