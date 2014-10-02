//Main Function
var App = function () {
    // IE mode
    var isIE8 = false;
    var isIE9 = false;
    var isIE10 = false;
    var $pageArea;
    var currentPage = ''; // current page

    //main settings
    var HoldInit = function () {

        isIE8 = !! navigator.userAgent.match(/MSIE 8.0/);
        isIE9 = !! navigator.userAgent.match(/MSIE 9.0/);
        isIE10 = !! navigator.userAgent.match(/MSIE 10.0/);

        if (isIE10) {
            jQuery('html').addClass('ie10'); // detect IE10 version
        }

        if (isIE10 || isIE9 || isIE8) {
            jQuery('html').addClass('ie'); // detect IE10 version
        }
    }

    //Tooltips
    var HoldTooltips = function () {
        if ($(".tooltips").length) {
            $('.tooltips').tooltip();
        }

        $("[data-toggle='tooltip']").tooltip();
    };

    //Popovers
    var HoldPopovers = function () {
        if ($(".popovers").length) {
            $('.popovers').popover();
        }
    };

    //The size of the sidebar menu
    var HoldNavigationToggler = function () {
        $('.navigation-toggler').bind('click', function () {
            if (!$('body').hasClass('small-nav')) {
                $('body').addClass('small-nav');
                $('.icon-arrow').hide();
                // $('.brand-wrap').hide();
            } else {
                $('body').removeClass('small-nav');
                $('.icon-arrow').hide();
                // $('.brand-wrap').show();
            };
        });
    };

    //Panel tools
    var HoldModuleTools = function () {
        $('.panel-tools .panel-close').bind('click', function (e) {
            $(this).parents(".panel").fadeOut(500, function(){
                $(this).remove();
        });
            e.preventDefault();
        });
        $('.panel-tools .panel-refresh').bind('click', function (e) {
            var el = $(this).parents(".panel");
            el.block({
                overlayCSS: {
                    backgroundColor: '#fff'
                },
                message: '<img src="assets/images/loading.gif" />',
                css: {
                    border: 'none',
                    color: '#333',
                    background: 'none'
                }
            });
            window.setTimeout(function () {
                el.unblock();
            }, 1000);
            e.preventDefault();
        });
        $('.panel-tools .panel-collapse').bind('click', function (e) {
            e.preventDefault();
            var el = jQuery(this).parent().closest(".panel").children(".panel-body");
            if ($(this).hasClass("collapses")) {
                $(this).addClass("expand").removeClass("collapses");
                el.slideUp(200);
            } else {
                $(this).addClass("collapses").removeClass("expand");
                el.slideDown(200);
            }
        });
    };

   //Sidebar menus
    var HoldSidebarNav = function () {
        $('.sidebar-menu li.active').addClass('open');
        $('.sidebar-menu > li a').bind('click', function () {
            if ($(this).parent().children('ul').hasClass('sub') && (!$('body').hasClass('small-nav') || !$(this).parent().parent().hasClass('main-navigation-menu'))) {
                if (!$(this).parent().hasClass('open')) {
                    $(this).parent().addClass('open');
                    $(this).parent().parent().children('li.open').not($(this).parent()).not($('.main-navigation-menu > li.active')).removeClass('open').children('ul').slideUp(300);
                    $(this).parent().children('ul').slideDown(300);
                } else {
                    if (!$(this).parent().hasClass('active')) {
                        $(this).parent().parent().children('li.open').not($('.main-navigation-menu > li.active')).removeClass('open').children('ul').slideUp(300);
                    } else {
                        $(this).parent().parent().children('li.open').removeClass('open').children('ul').slideUp(300);
                    }
                }
            }
        });
    };

    //function scroll to top
    var HoldGoTop = function () {
        $('.go-to-top').click(function(e) {
            $("html, body").animate({
                scrollTop: 0}, "slow");
                 e.preventDefault();
        });
    };

    //Sparkline
    var HoldSparkline = function () {
        $('#visit_1').sparkline([67547], {
            type: "bar",
            barSpacing: 2,
            barColor: "#00bdaf",
            barWidth: "57",
            height: "42",
            chartRangeMin: "10"
        });


        $('#visit_2').sparkline([30141], {
            type: "bar",
            barSpacing: 2,
            barColor: "#1c84c6",
            barWidth: "57",
            height: "20",
            chartRangeMin: "10"
        });

    };

    //Custom checkboxes & radios using jQuery Uniform plugin
    var HoldUniform = function () {
        if (!jQuery().uniform) {
            return;
        }
        var test = $("input[type=checkbox]:not(.toggle), input[type=radio]:not(.toggle, .star)");
        if (test.size() > 0) {
            test.each(function () {
                if ($(this).parents(".checker").size() == 0) {
                    $(this).show();
                    $(this).uniform();
                }
            });
        }
    }

    // range slider
    var HoldRangeSlider = function () {
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 500,
            values: [75, 300],
            slide: function (event, ui) {
                $("#slider-range-amount").text("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });
    }

    //iCheck plugin for login page
    var HoldCustomCheckbox = function () {
            $('input[type="checkbox"].grey, input[type="radio"].grey').iCheck({
                checkboxClass: 'icheckbox_minimal-grey',
                radioClass: 'iradio_minimal-grey',
                increaseArea: '10%' // optional
            });
    };

  return {
        //main function to initiate template pages
        init: function () {
             // page level handlers
            if (App.isPage("index")) {
                HoldVisitorsChart(); // handles plot charts for main page
                HoldSparkline(); // handles sparklines
                HoldPieChart();
                HoldCustomCheckbox();
            }
             // page level holders
            if (App.isPage("product")) {
                HoldRangeSlider();
            }
            HoldInit();

            HoldNavigationToggler(); //Navigation Toggler
            HoldSidebarNav(); //Saide bar navigation
            HoldGoTop(); //Got to top button
            HoldModuleTools(); //Tools
            HoldTooltips(); //Tooltips
            HoldPopovers(); //Popovers
            HoldUniform(); //Uniform
            HoldCustomCheckbox();
          },

       // set map page
        setPage: function (name) {
            currentPage = name;
        },

        // check current page
        isPage: function (name) {
            return currentPage == name ? true : false;
        }
    };
}();