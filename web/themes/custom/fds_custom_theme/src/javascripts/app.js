jQuery(function ($) {
  'use strict';

  var slider = tns({
    container: '.field--name-field-os2web-slideshow-image',
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
});
