# OS2Web8 docker image

Image based on official [Drupal image](https://hub.docker.com/_/drupal)

Image includes all functional project files inside (PHP code, Composer dependencies).

Drupal content files should be attached as [Volumes](https://docs.docker.com/storage/volumes/) to container:
* public files - `/opt/drupal/files`
* private files - `/opt/drupal/private`

## Environment settings

There are available following environment settings:

### Mysql database
* MYSQL_HOSTNAME - mysql service host name
* MYSQL_DATABASE - mysql service database name
* MYSQL_PORT - mysql service port
* MYSQL_USER - mysql service user
* MYSQL_PASSWORD - mysql service password
* MYSQL_ROOT_PASSWORD - mysql service root password, uses in mysql container

### Drupal
* DRUPAL_HASH_SALT - define drupal hash salt. Uses in `settings.php` file
* OS2WEB_THEME - Drupal theme name for OS2Web project

### Deployment sensitive

* WAIT_ON_MYSQL - flag is used to set delay for getting MYSQL service ready
* PRINT_STATUS - Runs "drush status" command
* DEPLOYMENT - Runs deployment action: drush updb, drush cr etc

## Build image

To build image use `build.sh` script with git tag of OS2Web project release as first argument.
NOTE: You should have existing tag for OS2Web project before.

Example:
```
./build.sh [tag-name] --push
```

`--push` - when you this option build will be pushed to docker hub.

## Install Drupal

In case you need to install OS2Web through docker image on new environment,
it should happen as separate deployment procedure with special docker image
settings.

* Checkout repository to separate branch `[recent-git-tag]-install`
* Add `source /install.sh` call above deployment section.
* Commit changes and create additional release tag `[recent-git-tag]-install`. 
So your tag, for example, will look like `0.0.2-install`

```
....
# Drupal installation step
source /install.sh

if [ "$DEPLOYMENT" = true ]; then
  echo "Running deployment"
.....

```

See detailed steps for install procedure `.docker/os2web/install.sh`
