jQuery(function ($) {
  'use strict';

});

// Tiny Slider slideshow img.
(function() {
  var selector = '.field--name-field-os2web-slideshow-image';

  if (document.querySelector(selector) !== null) {

    // Run tiny slider.
    tns({
      container: selector,
      items: 1,
      autoplay: true,
      autoplayHoverPause: true,
      gutter: 32,
      responsive: {
        576: {
          items: 2,
        },
      },
    });
  }
})();
