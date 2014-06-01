
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
