// Proposals form toggle.
(function($) {
  "use strict";
  $(document).ready(function ($) {
    $('.path-frontpage .field--name-field-os2web-column-1 .news').on('click', function (evt) {
      $(this).toggleClass('open');
      $(this).closest('.field--name-field-os2web-column-1').find('.paragraph--type--os2web-section-paragraph').toggleClass('show');
    });
  });
})(jQuery);
