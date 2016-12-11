/**
 * Created by Vinay on 11/28/2016.
 */
(function(){
    angular
        .module("WifiLoc8rApp")
        .controller("SharedController", SharedController);

    function SharedController() {

        console.log("Hello from the controller");
        $().ready(function() {
            //FrzdLoI7w7A : HD Video
            //gGXejiDkFy0 : Family guy
            $('#wrapper').tubular(
                {videoId: '',
                 start: 0,
                 mute: false
                }); // where idOfYourVideo is the YouTube ID.

        });
    }

})();