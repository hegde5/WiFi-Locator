/**
 * Created by Vinay on 12/10/2016.
 */
(function () {

    angular
        .module("WifiLoc8rApp")
        .factory("FeedbackService", FeedbackService);

    function FeedbackService($http) {

        var api = {
          submitFeedback  : submitFeedback,
          getAllFeedbacks : getAllFeedbacks,
          deleteFeedback  : deleteFeedback
        };
        return api;

        function submitFeedback(feedback) {
            return $http.post("/api/feedback/", feedback);
        }

        function getAllFeedbacks() {
            return $http.get("/api/feedback/");
        }

        function deleteFeedback(fid) {
            var url = "/api/feedback/"+fid;
            return $http.delete(url);
        }



    }

})();