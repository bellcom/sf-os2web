FROM drupal:8-apache-buster

# Installing additional dependencies.
RUN set -eux; \
	apt update; \
	apt install -qq -y \
		libxml2-dev \
		git \
		wget \
		mariadb-client-10.3 \
		cron; \
	docker-php-ext-install soap; \
	curl -fsSL "https://github.com/drush-ops/drush-launcher/releases/latest/download/drush.phar" -o /usr/local/bin/drush && chmod +x /usr/local/bin/drush

# Removing standard Drupal core and loading OS2Web project.
WORKDIR /opt
# Getting recent state of master branch.
ARG OS2WEB8_TAG
RUN set -eux; \
	rm -rf drupal; \
	wget https://github.com/OS2web/os2web8/archive/$OS2WEB8_TAG.tar.gz; \
	tar -xzvf $OS2WEB8_TAG.tar.gz; \
	rm $OS2WEB8_TAG.tar.gz; \
	mv os2web8-$OS2WEB8_TAG drupal
WORKDIR /opt/drupal

# Loading composer dependencies and configuring project folders.
RUN set -eux; \
	export COMPOSER_HOME="$(mktemp -d)"; \
	composer global require hirak/prestissimo;\
	COMPOSER_MEMORY_LIMIT=-1 composer install; \
	chown -R www-data:www-data web/sites web/modules web/themes; \
	# delete composer cache.
	rm -rf "$COMPOSER_HOME"

# Adding further site specific data to image.
RUN echo '<?php $settings["project_env"] = PROD_ENV; ' > /opt/drupal/web/sites/default/env.settings.php; \
	# Adding files directories.
	mkdir -p files; \
	rm -rf /opt/drupal/web/sites/default/files; \
	ln -sf /opt/drupal/files /opt/drupal/web/sites/default/files; \
	mkdir -p private; \
	# Adding syn directory.
	mkdir -p config/sync; \
	# Adjusting ownership
	chown -R www-data:www-data /opt/drupal/private /opt/drupal/files /opt/drupal/config/sync /opt/drupal/tmp; \
	chmod g+s -R /opt/drupal/private /opt/drupal/files /opt/drupal/config/sync

# Adding custom apache configuration with PHP value and log settings.
COPY apache/000-default.conf /etc/apache2/sites-enabled/000-default.conf

# Adding Drupal settings.
COPY settings/prod.settings.php /opt/drupal/web/sites/default/
