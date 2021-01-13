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

if [ "$DEPLOYMENT" = true ]; then
  echo "Running deployment"
  export DRUSH="drush --root=/opt/drupal"
  $DRUSH cr
  $DRUSH updb -y
else
  echo "Deployment skipped"
fi;

# Making sure that all files belong apache web server user.
chown -R www-data:www-data /opt/drupal/private /opt/drupal/files /opt/drupal/config/sync
chmod g+s /opt/drupal/private /opt/drupal/files /opt/drupal/config/sync

# Starting cron service.
service cron start

# Starting apache.
apache2-foreground
