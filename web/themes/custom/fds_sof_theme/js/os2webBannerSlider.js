// todo move to external script
var slideIndex = 1;
var slidePrevIndex = 1;

function plusSlides(n) {
  os2webBannerSliderShow(slideIndex += n);
}

function currentSlide(n) {
  os2webBannerSliderShow(slideIndex = n);
}

function os2webBannerSliderInit(parentSelector, childSelector) {
  var container = document.querySelector(parentSelector);
  if (container) {
    var slides = document.querySelectorAll(childSelector);
    if (slides && slides.length>1) {
      var dots = []
      for (i = 0; i < slides.length; i++) {
        if (i>0) {
          slides[i].style.display = "none";
        };
        slides[i].classList.add("blogSlides", "fade");
        dots.push(`<span onclick="currentSlide(${i+1})"></span>`);
      }
      slides.length
      container.classList.add("blog-slider__container");
      //container.insertAdjacentHTML( 'beforeend', `<div class="blog-slider__numbertext">1 / ${slides.length}</div>`);
      container.insertAdjacentHTML( 'beforeend', '<a class="blogSlider__prev" onclick="plusSlides(-1)"><img src="/themes/custom/fds_sof_theme/imgs/left-arrow.png"/></a>');
      container.insertAdjacentHTML( 'beforeend', '<a class="blogSlider__next" onclick="plusSlides(1)"><img src="/themes/custom/fds_sof_theme/imgs/right-arrow.png"/></a>');
      container.insertAdjacentHTML( 'beforeend', `<div class="blogSlider__dots">${dots.join("")}</div>`);
      dots = document.querySelectorAll(".blogSlider__dots>span");
      os2webBannerSliderShow = os2webBannerSliderShow(slides, dots);
      //console.log(os2webBannerSliderShow);
    };
  };
};

function os2webBannerSliderShow(slides, dots, initslidenum) {
  var _slides = slides;
  var _dots = dots;
  return function(n) {
    var i;
    if (n > _slides.length) {
      slideIndex = 1
    };
    if (n < 1) {
      slideIndex = _slides.length
    };

    for (i = 0; i < _dots.length; i++) {
      _dots[i].className = _dots[i].className.replace(" active", "");
    };
    _slides[slidePrevIndex - 1].style.display = "none";
    _slides[slideIndex - 1].style.display = "block";
    _dots[slideIndex - 1].className += " active";
    slidePrevIndex = slideIndex;
  };
}


function os2webBannerSliderShowX(n) {
  
  
  
}

// double banner to slider
(function($, Drupal, drupalSettings) {

  var bannerSelector = '.field--name-field-os2web-news-paragraph-bann';
  var bannerCount = document.querySelectorAll('.field--name-field-os2web-news-paragraph-bann > .field__item');
  if (document.querySelector(bannerSelector) !== null && bannerCount.length > 1) {
    tns({
      container: bannerSelector,
      items: 1,
      autoplay: false,
      autoplayHoverPause: true,
      autoplayButtonOutput: false,
      gutter: 32,
      rewind: false,
      nav: true,
      speed: 600,
      controls: true
    });
  }



  var selector = ".field--name-field-os2web-paragraphs.field__items";
  if (document.querySelectorAll(selector).length > 0) {
    var searchContainers  = document.querySelectorAll(selector);
    searchContainers.forEach(function(container, elm) {
      var items = container.querySelectorAll(selector + " > .field__item");
      var bannerItems = container.querySelectorAll(selector + " > .field__item .banner__image-outer ");
      if (bannerItems.length > 1 && items.length == bannerItems.length) {
        tns({
          container: container,
          items: 1,
          autoplay: false,
          autoplayHoverPause: true,
          autoplayButtonOutput: false,
          gutter: 32,
          rewind: false,
          nav: true,
          speed: 600,
          controls: true
        });
      }
    });
  }
})(jQuery, Drupal, drupalSettings);