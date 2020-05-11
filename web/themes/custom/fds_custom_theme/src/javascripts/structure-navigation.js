// Reposition icon inside menu.
(function() {
  var menuItems = document.querySelectorAll('.region-header__below .menu-item');

  for(var i = 0; i < menuItems.length; i++) {
    var menuItem = menuItems[i];
    var link = menuItem.querySelector('a:first-child');
    var iconImg = menuItem.querySelector('.field--name-field-os2web-icon');

    if (link === null || iconImg === null) {
      return;
    }

    link.insertAdjacentElement('afterbegin', iconImg);
  }
})();

// Prevent first level menu items from going to destination.
(function() {
  var links = document.querySelectorAll('.region-header__below .menu-level-0 > li > a');

  for (var i = 0; i < links.length; i++) {
    var link = links[i];

    link.addEventListener('click', function(event) {
      event.preventDefault();
    })
  }
})();
