

app.controller('WeekCtrl', function ($scope, $ionicModal, $localstorage) {
  'use strict';
  $scope.weeks = $localstorage.getObject('weeks', '[]');

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('templates/new-week-modal.html', function(modal) {
    $scope.weekModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Called when the form is submitted
  $scope.createWeek = function(week) {
  /*  console.log(week.start.toDateString());
    console.log(week.start.toJSON());
    console.log(week.start.toUTCString());
    */
    var date = {
      day: week.start.getDate(),
      year: week.start.getFullYear(),
      month: week.start.getMonth()+1
    };
    console.log(date);


    $scope.weeks.push({
      start: date
    });
    $scope.weekModal.hide();
    $localstorage.setObject('weeks', $scope.weeks);
    week.start = "";
  };

  // Open our new week modal
  $scope.newWeek = function() {
    $scope.weekModal.show();
  };

  // Close the new week modal
  $scope.closeNewWeek = function() {
    $scope.weekModal.hide();
  };
}); 

app.controller('ClientListCtrl', function($scope,  $ionicListDelegate, $ionicModal, $localstorage, $log){
  
  $ionicModal.fromTemplateUrl('templates/new-client-modal.html', function(modal) {
    $scope.clientModal = modal;
  }, {
    scope: $scope,  
    animation: 'slide-in-up'
  });

  //$ionicListDelegate.canSwipeItems(true);  ????
  $scope.clients = $localstorage.getObject('clients', '[]');
  
  /*$scope.$watch('clients', function () {
    console.log('clients changed');
    $localstorage.setObject('clients', $scope.clients);
  });*/

  $scope.toggleDeleteMode = function(){
    $scope.shouldShowDelete = !$scope.shouldShowDelete;
    $ionicListDelegate.showDelete($scope.shouldShowDelete);
  }

  // Open our new client modal
  $scope.addClient = function(){
    $scope.clientModal.show();
  }

  $scope.createClient = function(client){
    
    $scope.clients.push({ name : client.name, email : client.email });
    $scope.clientModal.hide();
    $localstorage.setObject('clients', $scope.clients);
    client.name = "";
    client.email = "";
  }
   

  // Close the new week modal
  $scope.closeNewClient = function() {
    $scope.clientModal.hide();
  };


});