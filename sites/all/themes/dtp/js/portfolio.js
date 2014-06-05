(function($, Drupal, window, document, undefined) {


  $.fn.SuperBox = function(options) {
//    console.log(options);

    var topBarHeight = $('ul.menu').height();

    var superbox = $('<div class="superbox-show"></div>');
    var superboxInner = $('<div class="superbox-inner"></div>');
    var superboximg = $('<img src="" class="superbox-current-img">');
    var superboxContent = $('<div class=portfolio-content></div>"');
    var superboxclose = $('<div class="superbox-close"></div>');

    superboxInner.append(superboximg).append(superboxContent).append(superboxclose);
    superbox.append(superboxInner);

    return this.each(function() {

      $('.superbox-list').click(function() {

        var currentimg = $(this).find('.superbox-img');
        var imgData = currentimg.data('img');
        superboximg.attr('src', imgData);

        var currentContent = $(this).find('.additional-data').html();
        superbox.find('.portfolio-content').empty().append(currentContent);

        if ($('.superbox-current-img').css('opacity') == 0) {
          $('.superbox-current-img').animate({opacity: 1});
        }

        if ($(this).next().hasClass('superbox-show')) {
          superbox.slideToggle();
        } else {
          superbox.insertAfter(this).css('display', 'block');
          //superbox.slideToggle();
        }

        $('html, body').animate({
          //scrollTop: superbox.position().top - currentimg.width() - topBarHeight
          //scrollTop: $(this).offset().top - currentimg.height()
        }, 'medium');

      });

      $(this).on('click', '.superbox-close', function() {
        $('.superbox-current-img').animate({opacity: 0}, 200, function() {
          $('.superbox-show').slideUp();
        });
      });

    });
  };

  Drupal.behaviors.mPortfolio = {
    attach: function(context, settings) {

      $('.view-display-id-home_portfolio .view-content').SuperBox();

    }
  };







})(jQuery, Drupal, this, this.document);