'use strict';

angular.
module('uploadVideo').
constant('uploadVideoConfig', {
  uploadUrl: "https://upload.wistia.com",
  videoUrl: "https://api.wistia.com/v1/medias.json",
  apiPassword: "ff717a4ff604e2533c38c2727cfca4dfdb7726c2236a647657f41223e5f806a9",
  projectId: ""
}).
component('videoUpload', {
  templateUrl: 'upload-video/upload-video.template.html',
  transclude: true,

  controller: ['$scope', '$element', '$http', '$filter', '$window', '$sce', '$timeout', 'uploadVideoConfig', function UploadVideoController($scope, $element, $http, $filter, $window, $sce, $timeout, uploadVideoConfig) {


    var vm = this;
    vm.progBar = false;
    vm.ReadyPlayer = false;
    vm.processingPlayer = false;
    vm.error = false;

    vm.options = {
      acceptFileTypes: /(mp4)|(mov)|(flv)$/i,
      url: [
        uploadVideoConfig.uploadUrl,
        "?api_password=" + uploadVideoConfig.apiPassword,
        "&project_id=" + uploadVideoConfig.projectId
      ].join(''),
      formData: function(form) {
        return form.serializeArray();
      },
      add: function(e, data) {
        vm.ReadyPlayer = false;
        vm.processingPlayer = false;
        vm.error = false;
        if (!vm.options.acceptFileTypes.test(data.files[0].name)) {
          vm.error = true;
          return vm.msgErr = "Please upload only Video Files.";
        }
        vm.ReadyPlayer = false;
        vm.processingPlayer = false;
        vm.progBar = true
        vm.fail = false;
        return data.submit();
      },
      done: function(e, data) {
        vm.videoHash = data.result.hashed_id;
        return vm.getVideo($http, $timeout, data.result.hashed_id);
      },
      fail: function(e, data) {
        vm.fail = true;
        vm.error = true;
        vm.msgErr = data.result.error;
        return;
      },
      progress: function(e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        vm.progress = progress;
      }
    }

    vm.getVideo = function($http, $timeout, videoId) {
      vm.processingPlayer = true;
      $http.get(uploadVideoConfig.videoUrl, {
        params: {
          api_password: uploadVideoConfig.apiPassword,
          hashed_id: videoId
        }
      }).then(function(res) {
        if (res.data) {
          vm.videoStatus = res.data[0].status;

          if (res.data[0].status !== "ready") {
            return $timeout(function() {
              vm.getVideo($http, $timeout, videoId)
            }, 3000);
          }
          vm.processingPlayer = false;
          vm.progBar = false;
          vm.ReadyPlayer = true;
          return window.Wistia.embed(videoId);
        }
      }, function(err) {
        vm.error = true;
        vm.msgErr = "Error Occured.";
        return;
      });
    }

  }]
});
