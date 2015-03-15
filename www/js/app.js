// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionic.contrib.ui.tinderCards'])

    .directive('noScroll',function() {
        return {
            restrict: 'A',
            link: function($scope, $element, $attr) {
                $element.on('touchmove', function(e) {
                    e.preventDefault();
                });
            }
        }
    })

    .controller('CardsCtrl', function($scope, $http,TDCardDelegate) {
        $scope.addCard = function(i) {
            $http.get('http://ivius.sangaline.com/random/Women').
                success(function(data, status, headers, config) {
                    data.id = Math.random();
                    $scope.cards.unshift(angular.extend({}, data));
                }).
                error(function(data,status,headers,config) {
                    console.log("$http.get() did not work");
                });
        }

        $scope.cardDestroyed = function(index) {
            $scope.cards.splice(index, 1);
            $scope.addCard();
        }

        $scope.cards = [];
        for(var i = 0; i < 2; i++) $scope.addCard();
    })

    .controller('CardCtrl', function($scope, TDCardDelegate) {
        $scope.cardSwipedLeft = function(index) {
            console.log('Left swipe');
            $scope.addCard();
        }

        $scope.cardSwipedRight = function(index) {
            console.log('Right swipe');
            $scope.addCard();
        }
    });

