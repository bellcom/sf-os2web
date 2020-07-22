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

// Accordion.
(function () {
  function handleClose(event) {
    var element = this;
    var listItem = element.closest('li');
    var content = listItem.querySelector('.accordion-content');
    var button = listItem.querySelector('.accordion-button');

    content.setAttribute('aria-expanded', 'false');
    content.setAttribute('aria-hidden', 'true');

    button.setAttribute('aria-expanded', 'false');
  }

  var buttons = document.querySelectorAll('.js-accordion-close-current');

  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];

    button.addEventListener('click', handleClose);
  }
})();

// Search.
document.addEventListener('DOMContentLoaded', function() {
  function toggle(event) {
    var element = this;
    var parent = element.closest('.searchy');

    parent.classList.toggle('searchy--visible-form');
  }

  var buttons = document.querySelectorAll('.js-toggle-searchy');

  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];

    button.addEventListener('click', toggle);
  }
});

// Open all file-links in a new window.
(function() {
  var links = document.querySelectorAll('.field--type-file .file a');

  for (var i = 0; i < links.length; i++) {
    var link = links[i];

    link.setAttribute('target', '_blank');
  }
})();

// Content reference mobile display.
(function() {
  var selector = '.paragraph--type--os2web-content-reference .mobile-only .field--name-field-os2web-content-reference';

  if (document.querySelector(selector) !== null) {

    // Run tiny slider.
    tns({
      container: selector,
      items: 1,
      autoplay: true,
      autoplayHoverPause: true,
      gutter: 32,
      rewind: true,
    });
  }
})();

// Mobile menu links toggle.
(function () {
  function handleToggle(event) {
    event.stopPropagation();
    event.preventDefault();

    let button = this;
    let isExpanded = button.getAttribute('aria-expanded') === 'true';

    button.setAttribute('aria-expanded', !isExpanded);
    const id = button.getAttribute('aria-controls');
    const controls = document.getElementById(id);
    if (!controls) {
      throw new Error(
        'No toggle target found with id: "' + id + '"'
      );
    }

    controls.setAttribute('aria-hidden', isExpanded);
  }

  var buttons = document.querySelectorAll('.menu-toggle .menu-toggle-button');

  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];

    button.addEventListener('click', handleToggle);
  }
})();
