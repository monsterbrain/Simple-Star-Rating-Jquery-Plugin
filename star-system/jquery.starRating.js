jQuery.fn.starRating = function(options) {

    var defaults = {
        total_stars  : 5,
        active_stars : 0,
        color        : 'yellow',
        animated     : true
    };

    var settings = $.extend( {}, defaults, options );

    var option_settings = {
        color_list : ['yellow', 'red', 'green', 'purple', 'blue']
    };

    jQuery.fn.hasAttr = function(name) {
        return this.attr(name) !== undefined;
    };

    this.each(function(){
        var total_stars  = jQuery(this).hasAttr('total')  ? parseInt(jQuery(this).attr('total'))  : defaults.total_stars;
        var active_stars = jQuery(this).hasAttr('active') ? parseInt(jQuery(this).attr('active')) : defaults.active_stars;
        var color        = jQuery(this).hasAttr('color')  ? jQuery(this).attr('color')  : defaults.color;

        if(!jQuery.inArray(color, option_settings.color_list))
            color = defaults.color;

        total_stars = active_stars > total_stars ? active_stars : total_stars;

        jQuery(this).find('a.star').remove();

        for(var i = 1; i <= total_stars ; i++) {
            var extra_class = color + ' ';

            var difference = active_stars - i + 1;

            if(difference >= 1)
                extra_class += 'active';

            jQuery(this).append('<a class="star' + ' '+ extra_class + '" style="display:none;"></a>');
        }

        if(settings.animated){
            for(var i = 1; i <= total_stars ; i++)
                jQuery(this).find('.star').eq(i - 1).delay(i * 100).show('fast');
        } else {
            jQuery(this).find('.star').show();
        }
        

        jQuery(this).after('<div style="clear:both"></div>');
    });

    return true;
};