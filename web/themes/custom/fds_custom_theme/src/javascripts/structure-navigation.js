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

// Toggle subnavigation.
(function() {
  function handleToggle(event) {
    event.preventDefault();

    var element = this;
    var currentListItem = element.parentElement;
    var listItems = document.querySelectorAll('.region-header__below .menu-level-0 > li.show-subnavigation');

    // Remove "show submenu" class from all list items.
    for (var i = 0; i < listItems.length; i++) {
      var listItem = listItems[i];

      if (currentListItem.isSameNode(listItem)) break; // Make toggle possible, so we can click on the element and remove the subnavigation as well.

      listItem.classList.remove('show-subnavigation');
    }

    // Add "show submenu" to current list item.
    currentListItem.classList.toggle('show-subnavigation');
  }

  var links = document.querySelectorAll('.region-header__below .menu-level-0 > li > a');

  for (var i = 0; i < links.length; i++) {
    var link = links[i];

    link.addEventListener('click', handleToggle);
  }
})();
