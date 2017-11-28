'use strict';

angular.
  module('WistiaUpload').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/upload', {
          template: '<video-upload></video-upload>'
        }).
        otherwise('/upload');
    }
  ]);
