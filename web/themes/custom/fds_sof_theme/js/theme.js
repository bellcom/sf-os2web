

(function ($, Drupal) {

    $("[data-link-url]").each(function() {
        let url = $(this).data("link-url");
        if (url.length > 0) {
            $(this).after().css("cursor", "pointer")
            $(this).on("click", function() {
               document.location.href = url;
            });
        }
    });

})(jQuery, Drupal);
