(function ($) {

    // sidebar toggle 
    var $sidebar_toggle = $(".sidebar-toggle");
    var $sidebar = $('#sidebar');

    // Initially add 'active' class for mobile view (<= 767px)
    $(window).resize(function () {
        if ($(window).width() <= 767) {
            $sidebar.addClass('active');
            $sidebar_toggle.addClass('active');
        } else {
            $sidebar.removeClass('active');
            $sidebar_toggle.removeClass('active');
        }
    });

    // Toggle sidebar on click
    $sidebar_toggle.click(function (e) {
        e.stopPropagation();

        // Toggle class for all screen sizes
        $(this).toggleClass('active');
        $sidebar.toggleClass('active');
    });
    // Improve accessibility
    $sidebar_toggle.attr('aria-expanded', 'false');
    $sidebar_toggle.click(function () {
        var isExpanded = $(this).attr('aria-expanded') === 'true';
        $(this).attr('aria-expanded', !isExpanded);
    });


    // Sidebar Dropdown 
    $('.nav-item.dropdown > a').click(function (e) {
        e.preventDefault();
    });

    $(".nav-item.dropdown > a").attr("href", "#");

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Function to open/close menu items
    $(".nav-item.dropdown a").click(debounce(function () {
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
    }, 200));

    $(".tutorLSB ul > li > a").each(function () {
        $(this).on("click", function (e) {
            if ($(this).parents("li").hasClass("dropdown")) {
                return;
            }
            $(this).parents(".tutorLSB").find("li.dropdown.active > a").not($(this)).trigger("click");
        });
    });

    // Image Lazy Load 
    document.addEventListener("DOMContentLoaded", function () {
        let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

        if ("IntersectionObserver" in window) {
            let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        let lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.classList.remove("lazy");
                        lazyImageObserver.unobserve(lazyImage);
                    }
                });
            });

            lazyImages.forEach(function (lazyImage) {
                lazyImageObserver.observe(lazyImage);
            });
        }
    });





})(jQuery)