/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function($, Drupal, window, document, undefined) {


// To understand behaviors, see https://drupal.org/node/756722#behaviors
  Drupal.behaviors.stikyMenu = {
    attach: function(context, settings) {

//      var stickyNavTop = $('.menu').offset().top;
//
//      var stickyNav = function() {
//        var scrollTop = $(window).scrollTop();
//
//        if (scrollTop > stickyNavTop-20) {
//          $('.menu').addClass('sticky');
//        } else {
//          $('.menu').removeClass('sticky');
//        }
//      };
//
//      stickyNav();
//
//      $(window).scroll(function() {
//        stickyNav();
//      });


    }
  };
  Drupal.behaviors.calculatTopOverlap = {
    attach: function(context, settings) {

      var centerSpanWidth = $('.middle-slogan span#second').width(),
              middleSloganWidth = $('.middle-slogan').width(),
              additionalElWidth = (middleSloganWidth - centerSpanWidth - 12) / 2;

      $('.middle-slogan span#first').width(additionalElWidth);
      $('.middle-slogan span#third').width(additionalElWidth);

    }
  };

  Drupal.behaviors.customizePlaceholders = {
    attach: function(context, settings) {
      var textInput = $('input, textarea');
      // Add placeholders if they are missing
      textInput.each(function() {
        var $this = $(this),
                str = '';
        if ($this.attr('placeholder') == '' || $this.attr('placeholder') != 'undefined') {
          // Search label for the element
          str = $.trim($("label[for='" + $this.attr('id') + "']").text())
          $this.attr('placeholder', str.replace("*", ""));
        }
      });
      $("[placeholder]").textPlaceholder();

    }
  }


  jQuery.fn.textPlaceholder = function() {

    return this.each(function() {

      var that = this;

      if (that.placeholder && 'placeholder' in document.createElement(that.tagName))
        return;

      var placeholder = that.getAttribute('placeholder');
      var input = jQuery(that);

      if (that.value === '' || that.value == placeholder) {
        input.addClass('text-placeholder');
        that.value = placeholder;
      }

      input.focus(function() {
        if (input.hasClass('text-placeholder')) {
          this.value = '';
          input.removeClass('text-placeholder')
        }
      });

      input.blur(function() {
        if (this.value === '') {
          input.addClass('text-placeholder');
          this.value = placeholder;
        } else {
          input.removeClass('text-placeholder');
        }
      });

      that.form && jQuery(that.form).submit(function() {
        if (input.hasClass('text-placeholder')) {
          that.value = '';
        }
      });

    });

  };

  Drupal.behaviors.customizeJCarouselPeople = {
    attach: function(context, settings) {

      var thisCaroselId = '.view-display-id-home_people';

      $(window).load(function() {
        var maxHeight = Math.max.apply(null, $(thisCaroselId + " li.jcarousel-item").map(function() {
          return $(this).height();
        }).get());

        var iconsPath = thisCaroselId + " .people-social-icons";
        var carouselWeight = $(thisCaroselId + " li").eq(0).width();
        var iconsHeight = $(iconsPath).length ? $(iconsPath).height() : 0;
        var iconsWidth = $(iconsPath).length ? $(iconsPath).width() : 0;
        var finalHeight = maxHeight + iconsHeight + 10 + 10;
        $(thisCaroselId + " li.jcarousel-item").css("height", finalHeight);
        
        // To do in each
        //$(iconsPath).css("margin-left", '20px');

        var prevBtnHeight = $(thisCaroselId + ' a.jcarousel-prev').height();
        // Assume that is the same.
        // var nextBtnHeight = $(thisCaroselId + ' a.jcarousel-next').height();

        var arrowTopvalue = (finalHeight / 2) - (prevBtnHeight / 2);

        $(thisCaroselId + ' a.jcarousel-prev').css("top", arrowTopvalue);
        $(thisCaroselId + ' a.jcarousel-next').css("top", arrowTopvalue);

      });

    }
  }

  Drupal.behaviors.addMaxLiNumbersForCoursesList = {
    attach: function(context, settings) {

      var thisBlockId = '.view-display-id-home_courses .views-field-field-text-multiple';
      lis = [];
      $(thisBlockId).each(function(index) {
        lis[index] = $(this).find('li').length;
      });
      maxLisNumber = Math.max.apply(Math, lis);

      $(thisBlockId).each(function(index) {
        currentLenght = $(this).find('li').length;
        diff = maxLisNumber - currentLenght;
        if (diff != 0) {
          $(this).find('.item-list ul .last').removeClass('last');
          for (var i = 0; i < maxLisNumber - currentLenght; i++) {
            if (i + 1 == diff) {
              $(this).find('.item-list ul').append('<li class="hack last"></li>');
            }
            else {
              $(this).find('.item-list ul').append('<li class="hack"></li>');
            }
          }
        }
      });
//      console.log($(this).html());
      // Wrapp li content.
      $(thisBlockId + ' li').each(function(index) {

        $(this).html("<div class='centered'>" + $(this).text() + "</div>");

        var currentInnerHeight = $(this).find('.centered').height(),
                currentOuterHeight = $(this).height();
                
                var toTop = (currentOuterHeight / 2) - (currentInnerHeight / 2);

        $(this).find('.centered').css('top', toTop);



//        $(this).wrap( "<div class='centerd'></div>" );
//        console.log($(this).html());
      });


    }
  };


})(jQuery, Drupal, this, this.document);
