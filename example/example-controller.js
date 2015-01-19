'use strict';

var ExampleCtrl = function($scope, $timeout) {

  var initialise = function() {

    $scope.resetState = function() {
      $scope.reset = true;
      $timeout(
      function() {
        $scope.reset = false;
        $scope.done = false;
      }, 0, true
      );
    };
    $scope.confirmed = function() {
      $timeout(
      function() {
        $scope.done = true;
      }, 1000, true
      );
    };
  };

  initialise();
};

angular.module('example').controller('ExampleCtrl', ExampleCtrl);
