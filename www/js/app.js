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

var update_slide = function (stage) {
    stage = typeof stage !== 'undefined' ? stage : 0;
    var category = window.location.hash.substr(1);
    if(category.length < 2) {
        var category = "Women";
    }

    $.getJSON("http://ivius.sangaline.com/random/" + category).done(function(response) {
        var first_color = response["colors"][0];
        var images_for_first_color = response["images"][first_color];
        var first_image_pair = images_for_first_color[0];
        var small_image_url = first_image_pair[0]["path"];
        var big_image_url = first_image_pair[1]["path"];
        var name = response["name"];
        var description = response["description"];
        var price = response["price"];
        var url = response["url"];

        var active = $(".item.active");
        var inactive = $(".item").not(".active");
        var timeout = 350;
        if(stage > 0) {timeout = 0;}
        if(stage == 1) {
            update_slide(2);
            active = $($(".item")[0]);
        }
        if(stage == 2) {
            active = $($(".item")[1]);
        }
        setTimeout(function () {
            active.find("img").attr("src", "./" + small_image_url);
            active.find("h3").html(name);
            active.find("p").html("Available for " + price + " at <a href=\"" + url + "\">ASOS.com");
        }, timeout);
    });
};
//document ready
$( function () {
    if(window.location.hash.substr(1) == "Men") {
        update_slide(1);
    }
    $(".carousel-control").click(update_slide);
    $(".nav-stacked").children("li:contains('men')").click(function() { setTimeout(function() { update_slide(1); }, 100) } );
});
