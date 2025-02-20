# OS2Web Hjemmeside Drupal 8 project

## Usage

* Clone the repository

```
git clone git@github.com:OS2web/os2web8.git
```
* Rename your installation if needed

* Go to the installation and start composer

```
composer install
```

* Follow the regular install process to install drupal using `drush` or UI 
  * select ```OS2Web``` as install profile
* Enable and set default drupal theme from available list on `/admin/appearance`

* After installation is done, enable OS2Web Basic modules module by:

```
drush en os2web_pagebuilder os2web_spotbox
```

* Enable other modules from OS2Web category and setup them on demand.

## Contribution

OS2Web Hjemmeside projects is opened for new features and os course bugfixes.
If you have any suggestion or you found a bug in project, you are very welcome
to create an issue in github repository issue tracker.
For issue description there is expected that you will provide clear and
sufficient information about your feature request or bug report.

### Code review policy
See [OS2Web code review policy](https://github.com/OS2Web/docs#code-review)

### Git name convention
See [OS2Web git name convention](https://github.com/OS2Web/docs#git-guideline)
