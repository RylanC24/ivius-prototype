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

    .controller('CardsCtrl', function($scope, TDCardDelegate) {
        var cardTypes = [
            { image: 'img/pic2.jpg', title: 'A sweet red hat'},
            { image: 'img/pic3.jpg', title: 'A nice watch'},
            { image: 'img/pic4.jpg', title: 'Looking pretty fresh in a flat brim'},
        ];


        $scope.addCard = function(i) {
            var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
            newCard.id = Math.random();
            $scope.cards.unshift(angular.extend({}, newCard));
        }

        $scope.cardDestroyed = function(index) {
            $scope.cards.splice(index, 1);
            $scope.addCard();
            //        console.log('Card removed');
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

//.run(function($ionicPlatform) {
//  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
//    if(window.cordova && window.cordova.plugins.Keyboard) {
//      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//    }
//    if(window.StatusBar) {
//      StatusBar.styleDefault();
//    }
//  });
//})
