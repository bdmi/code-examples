var App = function () {

    // Handle Refresh Widget
    var handleRefresh = function() {
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
    }

    // Handle Collapse Widget
    var handleCollapse = function() {
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
    }
     // Handle Close Widget
    var handleClose = function() {
        $('.panel-tools .panel-close').bind('click', function (e) {
            $(this).parents(".panel").fadeOut(500, function(){
                $(this).remove();
        });
            e.preventDefault();
        });
    }

    return {
        //main function to initiate template
        init: function () {
            handleRefresh();
            handleCollapse();
            handleClose();
        }
    }
}();