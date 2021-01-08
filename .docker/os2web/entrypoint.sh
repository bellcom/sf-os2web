#!/bin/bash
if [ "$WAIT_ON_MYSQL" = true ]; then
  echo "Waiting mysql service 10s"
  sleep 10
fi;

if [ "$PRINT_STATUS" = true ]; then
  echo "drush status"
  export DRUSH="drush --root=/opt/drupal"
  $DRUSH status
fi;

if [ "$INSTALL_OS2WEB" = true ]; then
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
else
 echo "Updating project files skipped"
fi;

if [ "$DEPLOYMENT" = true ]; then
  echo "Running deployment"
  export DRUSH="drush --root=/opt/drupal"
  $DRUSH cr
  $DRUSH updb -y
else
  echo "Deployment skipped"
fi;

# Starting cron service.
service cron start

# Starting apache.
apache2-foreground
