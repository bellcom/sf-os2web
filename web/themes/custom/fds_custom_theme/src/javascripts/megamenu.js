// Megamenu toggle.
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

// Reposition selfservice region in megamenu.
(function() {
  var region = document.querySelector('.region-megamenu__selfservice');
  var listItem = document.querySelector('.region-megamenu__navigation .menu-level-0 > li:last-child');

  if (region === null || listItem === null) {
    return;
  }

  listItem.appendChild(region);
})();
