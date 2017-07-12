/**
 * Created by Sulav on 7/11/2017.
 */

angular.module('musicApp', [])
        .controller('musicCtrl', function ($scope, $http) {
        $scope.youtubeList = new Array();
        $scope.freesoundList = new Array();
        $scope.mostRecentReview;
        $scope.getSong = function () {
            $scope.youtubeList = [];
            $scope.freesoundList = [];
          var song = document.getElementById("songSearch").value;
          var youTubeLink = $http.get("https://www.googleapis.com/youtube/v3/search?part=snippet&q="+song+"&key=AIzaSyAGgSE_81nMDV2sXtA3eAf0VTzWXg_rFU0");

            youTubeLink.success(function (data) {
                   angular.forEach(data.items, function(item){
                      item.id


                    if (item.id.videoId != undefined){
                        console.log("https://www.youtube.com/watch?v="+item.id.videoId)
                        $scope.youtubeList.push("https://www.youtube.com/embed/"+item.id.videoId);
                    }
                    else if (item.id.playlistId != undefined){
                        console.log(item.id.playlistId)
                        $scope.youtubeList.push("https://www.youtube.com/embed/"+item.id.playlistId);
                    }
                    else {
                        console.log(item.id.channelId)
                        $scope.youtubeList.push("https://www.youtube.com/embed/"+item.id.channelId);
                    }


                });
            });

            var freesoundApi = $http.get("http://www.freesound.org/apiv2/search/text/?query="+song+"&token=SlTDRxdMnpOrq7nBKksTiT9xtXrmAsJto98fvd94");

            freesoundApi.success(function (data) {
                var data = data.results.slice(0,5);
                angular.forEach(data, function(item){
                        $scope.freesoundList.push("https://freesound.org/embed/sound/iframe/"+item.id+"/simple/medium");


                });
            });

        };
        $scope.youtubeList = [];
    }).config(function($sceProvider) {
    $sceProvider.enabled(false);
});;
