echo "Installing new OS2Web installation"
export DRUSH="drush --root=/opt/drupal"
# Install drupal.
$DRUSH sql-drop -y
$DRUSH si os2web --account-pass=admin --locale=da -y

# Enable theme.
if [ -z "$OS2WEB_THEME" ]; then
  export OS2WEB_THEME="fds_custom_theme"
fi;
$DRUSH theme:enable $OS2WEB_THEME -y
$DRUSH config-set system.theme default $OS2WEB_THEME -y

# Enable modules.
$DRUSH en -y os2web_pagebuilder os2web_spotbox
