/**
 * @file
 * Designsystem.dk theme print page js implementation.
 */

(function (Drupal) {
  Drupal.theme.fdsPrintPage = function () {
    window.print();
    return false;
  };
})(Drupal);
