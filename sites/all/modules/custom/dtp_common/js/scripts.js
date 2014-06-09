(function($) {

  Drupal.behaviors.aboutPager = {
    attach: function(context, settings) {

      // Set views pager links as node titles.
      var dSettings = Drupal.settings;
      if (dSettings.aboutPager != undefined) {
        var titles = (dSettings.aboutPager != undefined) ? dSettings.aboutPager.titles : '';

        if (titles != '') {
          $('ul.pager li.pager-item, ul.pager li.pager-current').each(function(index) {

            var isAelement = $(this).find('a').length;
            if (isAelement) {
              $(this).find('a').text(titles[index]);
            }
            else {
              $(this).text(titles[index]);
            }

          });

        }
      }
    }

  };

  Drupal.behaviors.ajaxPagerFadeContent = {
    attach: function(context, settings) {
      $('ul.pager', context).ajaxStart(function() {
        $(this).parents('.view').find('.view-content', context).fadeTo(300, 0.5);
      });
      $('ul.pager', context).ajaxSuccess(function() {
        $(this).parents('.view').find('.view-content', context).fadeTo(300, 1.0);
      });
    }
  };

  Drupal.behaviors.scrollMenu = {
    attach: function(context, settings) {

      var topBarHeight = $('ul.menu').height();

      $('ul.menu a[href*=#]:not([href=#])').click(function(event) {

        //if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('ul.menu li a').removeClass('active');
          $(this).addClass('active');
          
          $('html,body').stop().animate({
            scrollTop: target.offset().top - topBarHeight - 50,
          }, 800);
          event.preventDefault();
        }
        //}
      });
    }
  };

  Drupal.behaviors.selectIntoTabs = {
    attach: function(context, settings) {
      var selectToTabs = {
        select: $(),
        container: $(),
        items: [],
        // Fill items with text from options.
        makeItems: function() {
          for (var i = 0, len = this.select.find('option').length; i < len; i++) {
            var $this = this.select.find('option').eq(i);
            this.items[this.items.length] = $this.text();
          }
        },
        // Create Tabs Slider;
        // Returns html string of slider.
        maketabs: function() {
          var str = '<div class="tabs-slider tabs-slider-processed">' +
                  '<span class="tabs-slider-left"></span>' +
                  '<span class="tabs-slider-right"></span>' +
                  '<div class="tabs-slider-container">';
          for (var i = 0, len = this.items.length; i < len; i++) {
            str += '<span class="tabs-slider-item" data-val="' +
                    this.select.find('option').eq(i).val() + '">' +
                    this.items[i] + '</span>';
          }
          str += '</div></div>';
          return str;
        },
        // Adding functionality to Tabs Slider.
        fn: function() {
          var $tabsSlider = this.container.find('.tabs-slider'),
                  $tabsSliderItems = $tabsSlider.find('.tabs-slider-item');
          $tabsSlider.attr('data-total', $tabsSliderItems.length);
          $tabsSlider.attr('data-index', 0);
          $tabsSlider.attr('data-visible', 5);

          $tabsSliderItems.eq(0).addClass('active');

          $tabsSliderItems.click(function() {
            var $this = $(this),
                    $container = $this.closest('.pane-content'),
                    $select = $container.find('select');
            $this.removeClass('active').addClass('active');
            $this.siblings().removeClass('active');

            $select.val($this.attr('data-val'));
            $container.find('.form-submit').click();
          });

          if ($tabsSliderItems.length > 6) {
            $tabsSlider.addClass('show-arrows');
          }
        },
        sliderArrows: function() {
          var $tabSliderMove = $('.show-arrows'),
                  $tabSliderMoveLeft = $tabSliderMove.find('.tabs-slider-left');
          $tabSliderMoveRight = $tabSliderMove.find('.tabs-slider-right');

          $tabSliderMove.addClass('disabled-left');

          for (var i = 0, len = $tabSliderMove.length; i < len; i++) {
            var $this = $($tabSliderMove[i]);
            $this.find('.tabs-slider-item').filter(function(a) {
              return a < 5;
            }).css('display', 'inline-block');
          }

          $tabSliderMoveLeft.click(function() {
            var $this = $(this),
                    $container = $this.parent(),
                    current = $container.attr('data-index') | 0, // 0
                    visible = $container.attr('data-visible') | 0 // 5
            if (current > 0) {
              $container.removeClass('disabled-right');
              var prev = current - 1,
                      last = current + visible - 1;
              $container.attr('data-index', current - 1);
              $container.find('.tabs-slider-item').eq(prev).css('display', 'inline-block');
              $container.find('.tabs-slider-item').eq(last).hide();
              if (prev == 0) {
                $container.addClass('disabled-left');
              }
            }
          });

          $tabSliderMoveRight.click(function() {
            var $this = $(this),
                    $container = $this.parent(),
                    total = $container.attr('data-total') | 0, // 19
                    current = $container.attr('data-index') | 0, // 0
                    visible = $container.attr('data-visible') | 0, // 5
                    cango = total - visible - 1; // 19-5-1 = 13
            if (current <= cango) {
              $container.removeClass('disabled-left');
              var prev = current,
                      last = current + visible;
              $container.attr('data-index', current + 1);
              $container.find('.tabs-slider-item').eq(prev).hide();
              $container.find('.tabs-slider-item').eq(last).css('display', 'inline-block');
              if (last + 1 == total) {
                $container.addClass('disabled-right');
              }
            }
          });
        },
        execute: function() {
          // Fill items with options from select.
          this.makeItems();
          // Create slider with items.
          this.container.prepend(this.maketabs());
          // Add slider functionallity.
          this.fn();
          return true;
        },
        init: function(a, b) {
          this.select = $(a);
          this.container = $(this.select).closest('.pane-content');
          this.items = [];
          if (this.execute()) {
            if (typeof b !== 'undefined') {
              return b();
            }
          }
        }
      }

      if (!$('.tabs-slider-processed').length) {
        selectToTabs.init('.view-display-id-home_portfolio select');
        //selectToTabs.init('.views-widget-filter-field_media_type_value select');
        //, selectToTabs.sliderArrows
      }

    }
  }




}(jQuery));