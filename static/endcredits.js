/*
 * jQuery endcredits Plugin (V2.0)
 *
 * Orignal code by Daniel Malkafly <malk@epichail.com> [https://github.com/Malkafly/endcredits]
 * Version 2 by Andrew-David Jahchan <hello@andrewdavid.net>
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses or later.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 */
$(document).ready(function () {

    //VARIABLES
    var endcredits_credits_position = 0;
    var endcredits_total_animation_time = 0;
    var endcredits_speeding = false;
    var endcredits_interval;
        
    var endcredits_maskHeight = $(window).height();
    var endcredits_maskWidth = $(window).width();

    function endcredits_animate_credits(){
        $('#credits').stop(true, false).animate({bottom: endcredits_maskHeight + "px"}, {
            duration: endcredits_total_animation_time,
            easing: 'linear',
            complete: function () {
                $('#titles').fadeOut('fast');
            },
            step: function(now, fx){
                endcredits_credits_position = fx.pos;
            } 
        }); 
    }

    $(document).on('click', 'a[name=creditos]', function() {
        $('#titles').removeAttr('style').fadeIn('slow');
        $('#credits').css({"left": ((endcredits_maskWidth - $('#credits').outerWidth()) / 2) + "px", "bottom": "-" + $('#credits').outerHeight() + "px"}).show();
        
        endcredits_total_animation_time = ($('#credits').outerHeight() * 2500) / 100;
        endcredits_animate_credits();

        return false;
    });

    $(document).on('mousedown mouseup', '#titles', function(event) {
        if(event.type === 'mousedown')
        {
            endcredits_speeding = false;
            var clickedon = $.now();

            endcredits_interval = setInterval(function(){
                if($.now() > (clickedon + 500))
                {
                    endcredits_speeding = true;
                    endcredits_total_animation_time = (endcredits_total_animation_time - (endcredits_credits_position * endcredits_total_animation_time))/4;
                    endcredits_animate_credits();

                    clearInterval(endcredits_interval);
                }
            }, 250);
        }
        else if(event.type === 'mouseup')
        {
            if(!endcredits_speeding)
            {
                endcredits_speeding = false;
                clearInterval(endcredits_interval);
                $('#titles').fadeOut('fast', function(){
                    $('#credits').stop(true, false);
                });
            }
            else
            {
                clearInterval(endcredits_interval);
                endcredits_total_animation_time = (endcredits_total_animation_time - (endcredits_credits_position * endcredits_total_animation_time))*4;
                endcredits_animate_credits();
            }
        }
    });
});
