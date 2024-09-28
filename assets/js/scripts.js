(function ($) {

    //testionial slider js
    $(".tbp_testimonial_slider").slick({
        slidesToShow: 3,
        centerMode: true,
        autoplay: true,
        arrows: false,
        responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 1,
            }
        }]
    });


    // sidebar toggle 
    var $sidebar_toggle = $(".sidebar-toggle");
    var $sidebar = $('.tutor-sidebar');

    // Initially add 'active' class for mobile view (<= 767px)
    if (window.innerWidth <= 767) {
        $sidebar_toggle.addClass('active');
        $sidebar.addClass('active');
    }

    // Toggle sidebar on click
    $sidebar_toggle.click(function (e) {
        e.stopPropagation();

        // Toggle class for all screen sizes
        $(this).toggleClass('active');
        $sidebar.toggleClass('active');
    });


    // Sidebar Dropdown 
    $('.nav-item.dropdown > a').click(function (e) {
        e.preventDefault();
    });

    $(".nav-item.dropdown > a").attr("href", "#");

    // Function to open/close menu items
    $(".nav-item.dropdown a").click(function () {
        var link = $(this);
        var closest_ul = link.closest("ul");
        var parallel_active_links = closest_ul.find(".active");
        var closest_li = link.closest("li");
        var link_status = closest_li.hasClass("active");
        var count = 0;

        closest_ul.find("ul").slideUp(250, function () {
            if (++count == closest_ul.find("ul").length) {
                parallel_active_links.removeClass("active");
            }
        });

        if (!link_status) {
            closest_li.children("ul").slideDown(250);
            closest_li.addClass("active");
        }
    });

    $(".tutorLSB ul > li > a").each(function() {
        $(this).on("click", function(e) {
            if ($(this).parents("li").hasClass("dropdown")) {
                return;
            }
            $(this).parents(".tutorLSB").find("li.dropdown.active > a").not($(this)).trigger("click");
        });
    });






})(jQuery)