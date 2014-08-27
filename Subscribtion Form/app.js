$(function() {

    "use strict";

    var app = window.app || {};

    app.SubscribeForm = function(){
        // Config
        var cfg = {
            form_tooltips: {
                success: 'You have been subscribed!',
                exist_email: 'You are already subscribed',
                empty_email: 'Enter your email',
                invalid_email: 'Enter a valid address',
                x_error: 'Error! Something wrong'
            }
        }
        // End Config

        var messages = cfg.form_tooltips,
            error = false,
            $form = $('#subscribe'),
            $email = $('#form-email'),
            $button = $('#btn-submit'),
            $tooltip;

        function renderTooltip(type, message) {
            var offset;

            if (!$tooltip) {
                $tooltip = $('<span class="form-tooltip"></span>').appendTo($form);
            }
            if (type == 'success') {
                $tooltip.removeClass('error').addClass('success');
            } else {
                $tooltip.removeClass('success').addClass('error');
            }

            $tooltip.text(message).fadeTo(0, 0);
            offset = $tooltip.outerWidth() / 2;
            $tooltip.css('margin-left', -offset).animate({top: '100%'}, 100).dequeue().fadeTo(100, 1);
            $tooltip.addClass('animated shake');
        }

        function hideTooltip() {
            if ($tooltip) {
                $tooltip.animate({top: '120%'}, 100).dequeue().fadeTo(100, 0);
                $tooltip.removeClass('animated shake');
            }
        }

        function changeFormState(type, message) {

            $email.removeClass('success error');

            if (type == 'normal') {
                hideTooltip();
            } else {
                renderTooltip(type, message);
                $email.addClass(type);
            }
        }

        $form.submit(function(event) {

            event.preventDefault();
            var email = $email.val();

            if (email.length == 0) {
                changeFormState('error', messages['empty_email']);
            } else {
                $.post('subscribe.php', {
                    'email': email,
                    'ajax': 1
                }, function(data) {
                    if (data.status == 'success') {
                        changeFormState('success', messages['success']);
                    } else {
                        switch(data.error) {
                            case 'empty_email':
                            case 'invalid_email':
                            case 'exist_email':
                                changeFormState('error', messages[data.error]);
                                break;
                            default:
                                changeFormState('error', messages['default_error'])
                                break;
                        }
                    }
                }, 'json');
            }
        });

        // Remove tooltip
        $email.on('change focus click keydown', function() {
            if ($email.val().length > 0) {
                changeFormState('normal');
            }
        });
    }

/* -------------------
    Init
---------------------*/
    app.SubscribeForm();   //Subscribe form
});
