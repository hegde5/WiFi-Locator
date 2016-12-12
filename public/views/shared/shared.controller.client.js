/**
 * Created by Vinay on 11/28/2016.
 */
(function(){
    angular
        .module("WifiLoc8rApp")
        .controller("SharedController", SharedController);

    function SharedController() {

        window.onload = function() {
            if (localStorage.justOnce!=="true") {
                localStorage.setItem("justOnce", "true");
                window.location.reload();
            }
        }();
        $().ready(function() {
            $(".button-collapse").sideNav();
            $('.carousel').carousel();
            //FrzdLoI7w7A : HD Video
            //gGXejiDkFy0 : Family guy
            //CqRBS19HjRQ : coffee beans
            $('#wrapper').tubular(
                {
                    videoId: 'FrzdLoI7w7A',
                    start: 0,
                    mute: false
                });
        });
        $('#myModal').modal();
    }

})();