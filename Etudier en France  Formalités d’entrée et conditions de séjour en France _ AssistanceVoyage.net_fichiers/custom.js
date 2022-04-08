// Remove empty paragraph
jQuery(document).ready(function() {
    jQuery('p').filter(function() {
        return jQuery.trim(jQuery(this).text()) === '' && jQuery(this).children().length == 0
    }).remove();
});

// Set View Count
jQuery(document).ready(function() {
    if (kopa_front_variable.template.post_id > 0) {
        jQuery.ajax({
            type: 'POST',
            url: kopa_front_variable.ajax.url,
            dataType: 'json',
            async: true,
            timeout: 5000,
            data: {
                action: 'kopa_set_view_count',
                wpnonce: jQuery('#kopa_set_view_count_wpnonce').val(),
                post_id: kopa_front_variable.template.post_id
            },
            beforeSend: function(XMLHttpRequest, settings) {
            },
            complete: function(XMLHttpRequest, textStatus) {
            },
            success: function(data) {
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    }
});

/*Sharing buttons*/
jQuery(window).load(function() {
    if (jQuery('.share_block').length == 1) {
        jQuery.ajax({
            type: 'POST',
            url: kopa_front_variable.ajax.url,
            dataType: 'html',
            async: true,
            data: {
                action: 'kopa_sharing_button',
                wpnonce: jQuery('#kopa_sharing_button_wpnonce').val(),
                pid: kopa_front_variable.template.post_id
            },
            beforeSend: function(XMLHttpRequest, settings) {
            },
            complete: function(XMLHttpRequest, textStatus) {
            },
            success: function(data) {
                if (data.length > 0) {
                    jQuery('.share_block').html(data).show();
                } else {
                    jQuery('.share_block').remove();
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    }
});



/* =========================================================
 Fix css
 ============================================================ */
jQuery(document).ready(function() {
    jQuery("#main-menu li ul li:last-child").css("border-bottom", "none");
    jQuery("#main-menu > li:first-child > a").css("border-left", "none");
    jQuery("#main-menu > li:last-child > a").css("border-right", "none");
    jQuery("#main-col .widget-area-1 .older-post li:last-child").css({
        "border-bottom": "none",
        "padding-bottom": 0,
        "margin-bottom": 0
    });
    jQuery("#bottom-sidebar .widget .kp-entry-list li:last-child").css({
        "border-bottom": "none",
        "padding-bottom": 0,
        "margin-bottom": 0
    });
    jQuery("#footer-menu li:first-child").css({
        "border-left": "none",
        "padding-left": 0,
        "margin-left": 0
    });
    jQuery("#main-col .widget-area-2 .older-post li:first-child").css("margin-top", 10);
    jQuery("#main-col .widget-area-3 .older-post li:first-child").css("margin-top", 10);
    jQuery("#main-menu > li:first-child > a").css("border-left", "none");
    jQuery(".kp-categories li:last-child").css({
        "border-bottom": "none",
        "padding-bottom": 0,
        "margin-bottom": 0
    });

    jQuery(".comments-list li.comment").last().css({
        "border-bottom": "none",
        "padding-bottom": 0,
        "margin-bottom": 0
    });

    jQuery("#sidebar .widget ul li:last-child").css({
        "border-bottom": "none",
        "padding-bottom": 0,
        "margin-bottom": 0
    });
    jQuery("#main-col .tweet_list li:last-child").css({
        "border-bottom": "none",
        "padding-bottom": 0,
        "margin-bottom": 0
    });
    jQuery(".tab-content-2 ul li:last-child").css({
        "border-bottom": "none",
        "padding-bottom": 0,
        "margin-bottom": 0
    });
    jQuery("#bottom-sidebar .widget ul.kp-categories li:last-child").prev().css({
        "border-bottom": "none",
        "padding-bottom": 0,
        "margin-bottom": 0
    });
    jQuery(".widget-area-1 .kopa_widget_articlelist .older-post li:first-child").css({
        "border-top": "none",
        "padding-top": 0
    });
    jQuery("#main-content ul li:last-child").css({
        "border-bottom": "none",
        "padding-bottom": 0,
        "margin-bottom": 0
    });
    jQuery(".widget-area-1 .older-post li:first-child").css({
        "border-top": "none"
    });
    jQuery("#sidebar .older-post li:first-child").css({
        "border-top": "none"
    });
    jQuery(".bottom-sidebar-bottom .older-post li:first-child").css({
        "border-top": "none",
        "padding-top": 0
    });
    jQuery("#bottom-sidebar ul li:last-child").css({
        "border-bottom": "none",
        "padding-bottom": 0,
        "margin-bottom": 0
    });
    jQuery(".tab-container .older-post li:first-child").css({
        "border-top": "none",
        "margin-bottom": 10
    });
});
/* =========================================================
 Create mobile menu
 ============================================================ */
function createMobileMenu(menu_id, mobile_menu_id) {
    // Create the dropdown base
    jQuery("<select />").appendTo(menu_id);
    jQuery(menu_id).find('select').first().attr("id", mobile_menu_id);

    // Populate dropdown with menu items
    jQuery(menu_id).find('a').each(function() {
        var el = jQuery(this);

        var selected = '';
        if (el.parent().hasClass('current-menu-item') == true) {
            selected = "selected='selected'";
        }

        var depth = el.parents("ul").size();
        var space = '';
        if (depth > 1) {
            for (i = 1; i < depth; i++) {
                space += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
            }
        }

        jQuery("<option " + selected + " value='" + el.attr("href") + "'>" + space + el.text() + "</option>").appendTo(jQuery(menu_id).find('select').first());
    });
    jQuery(menu_id).find('select').first().change(function() {
        window.location = jQuery(this).find("option:selected").val();
    });
}

jQuery(document).ready(function() {
    if (jQuery('#main-nav').length > 0) {
        createMobileMenu('#main-nav', 'responsive-menu');
    }
});

/* =========================================================
 Home page slider
 ============================================================ */
jQuery(window).load(function() {
    var sliders = jQuery('.home-slider');
    if (sliders.length > 0) {
        jQuery.each(sliders, function() {            
            jQuery(this).flexslider({
                animation: jQuery(this).find('input.animation').val(),
                direction: jQuery(this).find('input.direction').val(),
                slideshow_speed: parseInt(jQuery(this).find('input.slideshow_speed').val()),
                animation_speed: parseInt(jQuery(this).find('input.animation_speed').val()),
                slideshow: Boolean(jQuery(this).find('input.is_auto_play').val()),
                reverse: false,
                controlsContainer: ".flex-container",
                controlNav: true,
                start: function(slider) {
                    slider.removeClass('loading');
                }
            });
        });
    }
});

/* =========================================================
 Head Line slider
 ============================================================ */
jQuery(window).load(function() {
    jQuery('#head-line-slider').flexslider({
        animation: "slide",
        direction: "horizontal",
        reverse: true,
        slideshow: true,
        slideshowSpeed: 8000, //Integer: Set the speed of the slideshow cycling, in milliseconds
        animationSpeed: 700,
        start: function(slider) {
            slider.removeClass('loading');
        }
    });
});

/* =========================================================
 Tabs
 ============================================================ */
jQuery(document).ready(function() {
    // Tabs
    //When page loads...
    jQuery('.tabs-wrapper').each(function() {
        jQuery(this).find(".tab-content").hide(); //Hide all content
        jQuery(this).find("ul.tabs li:first").addClass("active").show(); //Activate first tab
        jQuery(this).find(".tab-content:first").show(); //Show first tab content
    });

    //On Click Event
    jQuery("ul.tabs li").click(function(e) {
        if (!jQuery(this).hasClass('active')) {
            jQuery(this).parents('.tabs-wrapper').find("ul.tabs li").removeClass("active"); //Remove any "active" class
            jQuery(this).addClass("active"); //Add "active" class to selected tab
            jQuery(this).parents('.tabs-wrapper').find(".tab-content").hide(); //Hide all tab content

            var activeTab = jQuery(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content    
            jQuery(this).parents('.tabs-wrapper').find(activeTab).show(); //Fade in the active ID content
        }
        e.preventDefault();
    });

    jQuery("ul.tabs li a").click(function(e) {
        e.preventDefault();
    })
});

/* =========================================================
 Twitter
 ============================================================ */
jQuery(document).ready(function() {
    var twitter_update_list = jQuery('.twitter_outer');
    if (twitter_update_list.length > 0) {
        jQuery.each(twitter_update_list, function() {
            jQuery(this).find('.twitter_inner').first().tweet({
                join_text: "auto",
                username: jQuery(this).find('.tweet_id').first().val(),
                avatar_size: 21,
                count: jQuery(this).find('.tweet_count').first().val(),
                auto_join_text_default: "",
                auto_join_text_ed: "",
                auto_join_text_ing: "",
                auto_join_text_reply: "",
                auto_join_text_url: "",
                loading_text: "<center>loading tweets...</center><br/>",
                template: "{avatar}{join}{text}{time}"
            });
        });
    }
});

jQuery(window).load(function() {
    jQuery(".tweet_list li:last-child").css({
        "margin": 0
    });
    jQuery("#bottom-sidebar .widget .tweet_list li:last-child").css({
        "border-bottom": "none",
        "padding-bottom": 0
    });
});

/* =========================================================
 Fix height of aside in bottom sidebar
 ============================================================ */

function fix_aside_height() {
    child = jQuery("#bottom-sidebar ol").children();
    max_height = jQuery("#bottom-sidebar ol > li:first-child").height();
    jQuery.each(child, function() {
        if (jQuery(this).height() > max_height) {
            max_height = jQuery(this).height();
        }
    });
    jQuery.each(child, function() {
        jQuery(this).height(max_height);
    });
}
jQuery(document).ready(function() {
    fix_aside_height();
});
jQuery(window).resize(function() {
    fix_aside_height();
});
jQuery(window).load(function() {
    fix_aside_height();
});


/* =========================================================
 Scroll to top
 ============================================================ */
jQuery(document).ready(function() {

    // hide #back-top first
    jQuery("#back-top").hide();

    // fade in #back-top
    jQuery(function() {
        jQuery(window).scroll(function() {
            if (jQuery(this).scrollTop() > 200) {
                jQuery('#back-top').fadeIn();
            } else {
                jQuery('#back-top').fadeOut();
            }
        });

        // scroll body to 0px on click
        jQuery('#back-top a').click(function() {
            jQuery('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });

});

/* =========================================================
 Accordion
 ========================================================= */
jQuery(document).ready(function() {
    (function() {
        var acc_wrapper = jQuery('.acc-wrapper');
        if (acc_wrapper.length > 0)
        {
            jQuery('.acc-wrapper .accordion-container').hide();
            jQuery.each(acc_wrapper, function(index, item) {
                jQuery(this).find(jQuery('.accordion-title')).first().addClass('active').next().show();

            });
            jQuery('.accordion-title').on('click', function(e) {
                if (jQuery(this).next().is(':hidden')) {
                    jQuery(this).parent().find(jQuery('.active')).removeClass('active').next().slideUp(300);
                    jQuery(this).toggleClass('active').next().slideDown(300);
                }
                e.preventDefault();
            });
        }
    })();

    (function() {
        var acc_wrapper_2 = jQuery('.acc-wrapper-2');
        if (acc_wrapper_2.length > 0)
        {
            jQuery('.acc-wrapper-2 .accordion-container-2').hide();
            jQuery.each(acc_wrapper_2, function(index, item) {
                jQuery(this).find(jQuery('.accordion-title-2')).first().addClass('active').next().show();

            });
            jQuery('.accordion-title-2').on('click', function(e) {
                if (jQuery(this).next().is(':hidden')) {
                    jQuery(this).parent().find(jQuery('.active')).removeClass('active').next().slideUp(300);
                    jQuery(this).toggleClass('active').next().slideDown(300);
                }
                e.preventDefault();
            });
        }
    })();
});

/* =========================================================
 Masonry
 ============================================================ */
jQuery(function() {

    var $container = jQuery('#masonry-container');
    if (jQuery('#masonry-container').length > 0) {
        $container.imagesLoaded(function() {
            $container.masonry({
                itemSelector: '.masonry-box',
                isAnimated: !Modernizr.csstransitions,
                isFitWidth: true
            });
        });
    }
});

/* =========================================================
 Comment Form
 ============================================================ */
jQuery(document).ready(function() {
    if (jQuery("#comments-form").length > 0) {
        // Validate the contact form
        jQuery('#comments-form').validate({
            // Add requirements to each of the fields
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                    minlength: 10
                }
            },
            // Specify what error messages to display
            // when the user does something horrid
            messages: {
                name: {
                    required: "Please enter your name.",
                    minlength: jQuery.format("At least {0} characters required.")
                },
                email: {
                    required: "Please enter your email.",
                    email: "Please enter a valid email."
                },
                url: {
                    required: "Please enter your url.",
                    url: "Please enter a valid url."
                },
                message: {
                    required: "Please enter a message.",
                    minlength: jQuery.format("At least {0} characters required.")
                }
            },
            // Use Ajax to send everything to processForm.php
            submitHandler: function(form) {
                jQuery("#submit-comment").attr("value", "Sending...");
                jQuery(form).ajaxSubmit({
                    success: function(responseText, statusText, xhr, $form) {
                        jQuery("#response").html(responseText).hide().slideDown("fast");
                        jQuery("#submit-comment").attr("value", "Comment");
                    }
                });
                return false;
            }
        });
    }

    if (jQuery("#contact-form").length > 0) {
        // Validate the contact form
        jQuery('#contact-form').validate({
            // Add requirements to each of the fields
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                    minlength: 10
                }
            },
            // Specify what error messages to display
            // when the user does something horrid
            messages: {
                name: {
                    required: "Please enter your name.",
                    minlength: jQuery.format("At least {0} characters required.")
                },
                email: {
                    required: "Please enter your email.",
                    email: "Please enter a valid email."
                },
                url: {
                    required: "Please enter your url.",
                    url: "Please enter a valid url."
                },
                message: {
                    required: "Please enter your comment.",
                    minlength: jQuery.format("At least {0} characters required.")
                }
            },
            // Use Ajax to send everything to processForm.php
            submitHandler: function(form) {
                jQuery("#submit-contact").attr("value", "Sending...");
                jQuery(form).ajaxSubmit({
                    success: function(responseText, statusText, xhr, $form) {
                        jQuery("#response").html(responseText).hide().slideDown("fast");
                        jQuery("#submit-contact").attr("value", "Submit");
                    }
                });
                return false;
            }
        });
    }
});

/* =========================================================
 Close Alert Box
 ========================================================= */
jQuery(document).ready(function($) {

    jQuery(".close-info").click(function() {
        jQuery(".kp-info").fadeOut("slow");
        return false;
    });

    jQuery(".close-success").click(function() {
        jQuery(".kp-success").fadeOut("slow");
        return false;
    });

    jQuery(".close-warning").click(function() {
        jQuery(".kp-warning").fadeOut("slow");
        return false;
    });

    jQuery(".close-question").click(function() {
        jQuery(".kp-question").fadeOut("slow");
        return false;
    });

});



/* =========================================================
 prettyPhoto
 ============================================================ */
jQuery(window).load(function() {
    jQuery("a[rel^='prettyPhoto']").prettyPhoto({
        overlay_gallery: false,
        "theme": 'light_square',
        keyboard_shortcuts: true,
        social_tools: false
    });
});
/* =========================================================
 Toggle Boxes
 ============================================================ */
jQuery(document).ready(function() {
    var toggles = jQuery('h3.kopa-toggle-caption');
    if (toggles.length > 0) {
        toggles.click(function(e) {
            if (jQuery(this).hasClass('active')) {
                jQuery(this).parent().find('div.panel').slideUp('300');
                jQuery(this).children('span').html('+');
                jQuery(this).removeClass('active');
            } else {
                jQuery(this).parent().find('div.panel').slideDown('300');
                jQuery(this).children('span').html('-');
                jQuery(this).addClass('active');
            }
            e.preventDefault();
        });
    }
});