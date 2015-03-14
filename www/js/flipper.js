var update_slide = function (stage) {
    stage = typeof stage !== 'undefined' ? stage : 0;
    var category = window.location.hash.substr(1);
    if(category.length < 2) {
        var category = "Women";
    }

    $.getJSON("./random/" + category).done(function(response) {
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
