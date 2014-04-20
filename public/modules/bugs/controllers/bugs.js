'use strict';

// Bugs controller
angular.module('bugs').controller('BugsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bugs',
    function($scope, $stateParams, $location, Authentication, Bugs) {
        $scope.authentication = Authentication;

        // Create new Bug
        $scope.create = function() {
        	// Create new Bug object
            var bug = new Bugs({
                name: this.name
            });

            // Redirect after save
            bug.$save(function(response) {
                //$location.path('bugs/' + response._id);
                $location.path('bugs');
            });

            // Clear form fields
            this.name = '';
        };


        //toggle whether ug is done
        $scope.toggle = function(bug){
            bug.done = !bug.done;
            bug.$update(function(response){
                console.log('response : '+ response);
            });
        };


        $scope.filterDoneBugs = function (bug)
        {
            if(bug.done)
            {
                return true;
            }
            else{
                return false;
            }
        };

        // Remove existing Bug
        $scope.remove = function(bug) {
            if (bug) {
                bug.$remove();

                for (var i in $scope.bugs) {
                    if ($scope.bugs[i] === bug) {
                        $scope.bugs.splice(i, 1);
                    }
                }
            } else {
                $scope.bug.$remove(function() {
                    $location.path('bugs');
                });
            }
        };

        // Update existing Bug
        $scope.update = function() {
            var bug = $scope.bug;

            bug.$update(function() {
                $location.path('bugs/' + bug._id);
            });
        };

        // Find a list of Bugs
        $scope.find = function() {
            Bugs.query(function(bugs) {
                $scope.bugs = bugs;
            });
        };

        // Find existing Bug
        $scope.findOne = function() {
            Bugs.get({
                bugId: $stateParams.bugId
            }, function(bug) {
                $scope.bug = bug;
            });
        };
    }
]);