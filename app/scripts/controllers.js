"use strict";
angular.module('ConfusionApp').controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
  $scope.tab = 1;
  $scope.filText = '';
  $scope.showDetails = false;

   $scope.dishes= menuFactory.getDishes();


  $scope.select = function(setTab) {
    $scope.tab = setTab;
    
    if (setTab === 2) {
      $scope.filText = "appetizer";
    } 
    else if (setTab === 3) {
      $scope.filText = "mains";
    }
    else if (setTab === 4) {
      $scope.filText = "dessert";
    }
    else {
      $scope.filText = "";
    }
  };
  
  $scope.isSelected = function (checkTab) {
    return ($scope.tab === checkTab);
  };
  $scope.toggleDetails = function() {
    $scope.showDetails = !$scope.showDetails;
};
}])

.controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', function($scope) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        
  .controller('dishDetailController', ['$scope','menuFactory', function ($scope,menuFactory) {

        
        $scope.dish = menuFactory.getDish(3);

    }]).controller('DishCommentController',['$scope',function($scope){
            $scope.commentSec = { 
                                author: '',
                                rating: 5,
                                comment: '',
                                date: new Date().toISOString() 
                              };
            
            //Step 1: Create a JavaScript object to hold the comment from the form
            
            $scope.submitComment = function () {
                
                //Step 2: This is how you record the date
                // "The date property of your JavaScript object holding the comment" = new Date().toISOString();
              $scope.date = new Date().toISOString();
                
                // Step 3: Push your comment into the dish's comment array
                //$scope.dish.comments.push("Your JavaScript Object holding the comment");
                $scope.dish.comments.push({
                  author: $scope.commentSec.author,
                  rating: $scope.commentSec.rating,
                  comment: $scope.commentSec.comment,
                  date: $scope.commentSec.date
                });
                
                //Step 4: reset your form to pristine
                $scope.commentSec.author = '';
                $scope.commentSec.rating = 5;
                $scope.commentSec.comment = '';
                $scope.commentForm.$setPristine();
            };
    }]);