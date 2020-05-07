jQuery(function ($) {
  'use strict';

});

// Language selector.
// Run through all links and truncate Danish to 2 chars. (ex. Da).
(function() {
  var links = document.querySelectorAll('.block-language ul a');

  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    var text = 	link.textContent || link.innerText;
    var truncatedText = text.substring(0, 2);

    // Inject the content back into the DOM.
    if (link.textContent) {
      link.textContent = truncatedText;
    } else {
      link.innerText = truncatedText;
    }
  }
})();

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

// Megamenu.
(function() {
  function handleToggle(e) {
    var body = document.querySelector('body');

    body.classList.toggle('custom-megamenu--visible');
  }

  var toggles = document.querySelectorAll('.js-toggle-megamenu');

  for (var i = 0; i < toggles.length; i++) {
    var toggle = toggles[i];

    toggle.addEventListener('click', handleToggle);
  }
})();
