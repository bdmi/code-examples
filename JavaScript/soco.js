(function($) {

    "use strict";

    function ieViewFix() {

        if($.browser.version > 9) {
            $('.modal').removeClass('fade');
        }

        if ($.browser.msie && $.browser.version == 10) {
            $("html").addClass("ie10");
        }
    }

     function handleMain() {

        $('.bar').mosaic({
            animation: 'slide' //fade or slide
        });

        $('#iamwith').bind('change', function() {
            var elements = $('div.interested').children().hide(); // hide all the elements
            var value = $(this).val();

            if (value.length) { // if somethings' selected
                elements.filter('.' + value).show(); // show the ones we want
            }
        }).trigger('change');

        $(".pic-caption").css("opacity", 0);
        $('.pic-caption').hover(function() {
            $(this).animate({opacity: 1.0}, 300);

             }, function() {
                $(this).animate({opacity: 0}, 300);
        });

        FastClick.attach(document.body);

        //green numbers
        $('body.single-post .entry-content ol li').wrapInner('<span> </span>');

}

/*----------------------------------------------------*/
/*  handleModal
/*----------------------------------------------------*/
    function handleModal() {
        $('#modal').on('show', function () {
            $(this).find('.modal-body').css({width:'auto',
                                       height:'auto',
                                      'max-height':'100%'});
        });
    }

/*----------------------------------------------------*/
/*  exists - Check if an element exists
/*----------------------------------------------------*/
    function exists(e) {
        return $(e).length > 0;
    }

/*----------------------------------------------------*/
/*  handleMenuIcon
/*----------------------------------------------------*/
    function showHideMobileMenu() {
        /* prepend menu icon */
        $('.nav-primary').before('<a href="#" id="mobile-menu-trigger"><i class="fa fa-bars"></i></a>');

        $("#mobile-menu-trigger").click(function(e) {

            var $t = $(this);
            var $n = $("#mobile-menu");

            if ($t.hasClass("mobile-menu-opened")) {
                $t.removeClass("mobile-menu-opened").addClass("mobile-menu-closed");
                $n.slideUp(300);
            } else {
                $t.removeClass("mobile-menu-closed").addClass("mobile-menu-opened");
                $n.slideDown(300);
            }
            e.preventDefault();
        });
    }

/*----------------------------------------------------*/
/*  handleMobileMenu
/*----------------------------------------------------*/
     function handleMobileMenu() {

        var MobileBreakpoint = 979;

        if ($(window).width() > MobileBreakpoint) {
            $("#mobile-menu").hide();
            $("#mobile-menu-trigger").removeClass("mobile-menu-opened").addClass("mobile-menu-closed");
        }
        else {
            if (!exists("#mobile-menu")) {

                $("#menu-main-nav").clone().attr({
                    id: "mobile-menu",
                    "class": "fixed"
                }).insertBefore("#nav");

                $("#mobile-menu > li > a").each(function() {
                    var $t = $(this);
                    if ($t.next().hasClass('sub-menu') || $t.next().is('ul')) {
                        $t.append('<span class="fa fa-angle-down mobile-menu-submenu-arrow mobile-menu-submenu-closed"></span>');
                    }
                });

                $(".mobile-menu-submenu-arrow").click(function(event) {
                    var $t = $(this);
                    if ($t.hasClass("mobile-menu-submenu-closed")) {
                        $t.parent().siblings("ul").slideDown(300);
                        $t.removeClass("mobile-menu-submenu-closed fa-angle-down").addClass("mobile-menu-submenu-opened fa-angle-up");
                    } else {
                        $t.parent().siblings("ul").slideUp(300);
                        $t.removeClass("mobile-menu-submenu-opened fa-angle-up").addClass("mobile-menu-submenu-closed fa-angle-down");
                    }
                    event.preventDefault();
                });

                $("#mobile-menu li, #mobile-menu li a, #mobile-menu ul").attr("style", "");
                $("#mobile-menu > li").removeClass("menu-right");
            }
        }
    }

/*----------------------------------------------------*/
/*  handleReadmore
/*----------------------------------------------------*/
    function handleReadmore() {
        var MobileBreakpoint = 480;
        var MobilesmBreakpoint = 320;

        if ($(window).width() <= MobilesmBreakpoint) {
            $('.about-widget').readmore({
                speed: 300,
                maxHeight: 356,
                heightMargin: 0,
                moreLink: '<a href="#" class="read-more">Read More</a>',
                lessLink: '<a href="#" class="read-less">Close</a>',
                afterToggle: function(trigger, element, expanded) {
                    if(! expanded) { // The "Close" link was clicked
                      $('html, body').animate( { scrollTop: element.offset().top }, {duration: 100 } );
                    }
                }
            });
        }
        else if ($(window).width() <= MobileBreakpoint) {
            $('.about-widget').readmore({
                speed: 300,
                maxHeight: 322,
                heightMargin: 0,
                moreLink: '<a href="#" class="read-more">Read More</a>',
                lessLink: '<a href="#" class="read-less">Close</a>',
                afterToggle: function(trigger, element, expanded) {
                    if(! expanded) { // The "Close" link was clicked
                      $('html, body').animate( { scrollTop: element.offset().top }, {duration: 100 } );
                    }
                }
            });
        }
    }

/*----------------------------------------------------*/
/*  showSecondMenu
/*----------------------------------------------------*/
     function showSecondMenu() {
        var MobileBreakpoint = 480;

        if ($(window).width() <= MobileBreakpoint) {
            $('.nav-primary').before('<ul id="menu-main-nav" class="menu genesis-nav-menu menu-secondary"><li><a href="#" id="mcontact">Contact Us</a></li><li><a href="http://sobercollege.com/innovative-drug-rehab/">Why Choose Us?</a></li><li><a href="http://sobercollege.com/college-rehab-program/">Rehab & College</a></li></ul>');

            $("#mcontact").click(function(){
                $("#mobile-form").slideToggle(300);
                return false;
            });
        }
    }
/*----------------------------------------------------*/
/*  ISOTOPE
/*----------------------------------------------------*/
    function handleIsotope() {
        var $container = $('#blog_grid');
        $container.isotope({
            animationOptions: {
                duration: 750,
                easing: 'linear'
            },
            transformsEnabled: false
        });
    }

    $(document).ready(function() {
        ieViewFix();
        handleMain();
        handleMobileMenu();
        showHideMobileMenu();
        handleModal();
        handleReadmore();
        showSecondMenu();
    });

    $(window).load(function() {
        handleIsotope();
    });

    $(window).resize(function() {
        handleMobileMenu();
        // handleReadmore();
    });

})(window.jQuery);