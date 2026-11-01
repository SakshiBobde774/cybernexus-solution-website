(function($) {
    "use strict";
    /* -------------------------------------
               Prealoder
         -------------------------------------- */
    $(window).on('load', function(event) {
        $('.js-preloader').delay(50).fadeOut(50);
    });
    /* -------------------------------------
          Open Search box
    -------------------------------------- */
    $('.shopcart').on('click', function() {
        $('.cart-popup').addClass('open');
        $('.body_overlay').addClass('open');
    });
    $('.close-popup, .body_overlay').on('click', function() {
        $('.cart-popup').removeClass('open');
        $('.body_overlay').removeClass('open');
    });

    $('.sidebar-menu').on('click', function() {
        $('.contact-popup').addClass('open');
        $('.body_overlay').addClass('open');
    });
    $('.close-popup, .body_overlay').on('click', function() {
        $('.contact-popup').removeClass('open');
        $('.body_overlay').removeClass('open');

    });

    /* -------------------------------------
          Progressbar Animation
    -------------------------------------- */
    if ($('.skills').length) {
        var offsetTop = $('.skills').offset().top;
        $(window).scroll(function() {
            var height = $(window).height();
            if ($(window).scrollTop() + height > offsetTop) {
                $('.skillbar').each(function() {
                    $(this).find('.skillbar-bar').animate({
                        width: $(this).attr('data-percent')
                    }, 1500);
                });
            }
        });
    }
    /*--------------------------
                 Count Down Timer
      ----------------------------*/
    $('[data-countdown]').each(function() {
        var $this = $(this),
            finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function(event) {
            $this.html(event.strftime('<span class="cdown day"><span class="time-count">%-D</span> <p>Days</p></span> <span class="cdown hour"><span class="time-count">%-H</span> <p>Hours</p></span> <span class="cdown minutes"><span class="time-count">%M</span> <p>mins</p></span> <span class="cdown second"><span class="time-count">%S</span> <p>secs</p></span>'));
        });
    });

    /* -------------------------------------
          Product Quantity
    -------------------------------------- */
    var minVal = 1,
        maxVal = 20;
    $(".increaseQty").on('click', function() {
        var $parentElm = $(this).parents(".qtySelector");
        $(this).addClass("clicked");
        setTimeout(function() {
            $(".clicked").removeClass("clicked");
        }, 100);
        var value = $parentElm.find(".qtyValue").val();
        if (value < maxVal) {
            value++;
        }
        $parentElm.find(".qtyValue").val(value);
    });
    // Decrease product quantity on cart page
    $(".decreaseQty").on('click', function() {
        var $parentElm = $(this).parents(".qtySelector");
        $(this).addClass("clicked");
        setTimeout(function() {
            $(".clicked").removeClass("clicked");
        }, 100);
        var value = $parentElm.find(".qtyValue").val();
        if (value > 1) {
            value--;
        }
        $parentElm.find(".qtyValue").val(value);
    });


    /* -------------------------------------
          Header Topbar
    -------------------------------------- */

    $('.mobile-top-bar').on('click', function() {
        $('.header-top-right').addClass('open')
    });
    $('.close-header-top').on('click', function() {
        $('.header-top-right').removeClass('open')
    });
    /* -------------------------------------
          sticky Header
    -------------------------------------- */
    var wind = $(window);
    var sticky = $('.header-wrap');
    wind.on('scroll', function() {
        var scroll = wind.scrollTop();
        if (scroll < 100) {
            sticky.removeClass('sticky');
        } else {
            sticky.addClass('sticky');
        }
    });

    /*---------------------------------
        Responsive mmenu
    ---------------------------------*/
    $('.mobile-menu a').on('click', function() {
        $('.main-menu-wrap').addClass('open');
        $('.mobile-bar-wrap.style2 .mobile-menu').addClass('open');
    });

    $('.mobile_menu a').on('click', function() {
        $(this).parent().toggleClass('open');
        $('.main-menu-wrap').toggleClass('open');
    });

    $('.menu-close').on('click', function() {
        $('.main-menu-wrap').removeClass('open')
    });
    $('.mobile-top-bar').on('click', function() {
        $('.header-top').addClass('open')
    });
    $('.close-header-top button').on('click', function() {
        $('.header-top').removeClass('open')
    });
    var $offcanvasNav = $('.main-menu'),
        $offcanvasNavSubMenu = $offcanvasNav.find('.sub-menu');
    $offcanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i class="las la-angle-down"></i></span>');

    $offcanvasNavSubMenu.slideUp();

    $offcanvasNav.on('click', 'li a, li .menu-expand', function(e) {
        var $this = $(this);
        if (($this.parent().attr('class').match(/\b(has-children|sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('menu-expand'))) {
            e.preventDefault();
            if ($this.siblings('ul:visible').length) {
                $this.siblings('ul').slideUp('slow');
            } else {
                $this.closest('li').siblings('li').find('ul:visible').slideUp('slow');
                $this.siblings('ul').slideDown('slow');
            }
        }
        if ($this.is('a') || $this.is('span') || $this.attr('class').match(/\b(menu-expand)\b/)) {
            $this.parent().toggleClass('menu-open');
        } else if ($this.is('li') && $this.attr('class').match(/\b('has-children')\b/)) {
            $this.toggleClass('menu-open');
        }
    });


    /* -------------------------------------
                Category Dropdown
    -------------------------------------- */
    $('.has-subcat').on('click', function() {
        $(this).toggleClass('open');
        $(this).find('.subcategory').slideToggle(500);
        $(this).siblings().find('.subcategory').slideUp(500);
        $(this).siblings().removeClass('open');
    })
    /* -------------------------------------
                 range slider
        -------------------------------------- */
    $("#slider-range_one").slider({
        range: true,
        min: 0,
        max: 400,
        values: [10, 300],
        slide: function(event, ui) {
            $("#amount_one").val("$" + ui.values[0] + " - " + "$" + ui.values[1]);
        }
    });
    $(" #amount_one").val("$" + $("#slider-range_one").slider("values", 0) +
        " - " + "$" + $("#slider-range_one").slider("values", 1));

    /*---------------------------------
           Hero Slider
    ---------------------------------*/
    var hero_slider_two = new Swiper('.hero-slider-two', {
        spaceBetween: 0,
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 9000,
            disableOnInteraction: true,
        },
        autoHeight: true,
        speed: 1500,
        pagination: {
            el: '.hero-pagination',
            clickable: true,
            dynamicBullets: true,
        },

    });
    /*---------------------------------
        Single  Product Slider 
    ---------------------------------*/
    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 30,
        slidesPerView: 2,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
       
    });
    var galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        thumbs: {
            swiper: galleryThumbs
        }
    });

    /*---------------------------------
            Testimonial  Slider
    ---------------------------------*/
    var testimonial_one = new Swiper('.testimonial-slider-one', {
        slidesPerView: 2,
        loop: true,
        speed: 1500,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.testimonial-pagination',
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 20,

            },
            768: {
                slidesPerView: 2,
                spaceBetween: 35,
            }
        }
    });
    /*-------------------------------------
         Scroll to top
    ----------------------------------*/

    // Show or hide the  button
    $(window).on('scroll', function(event) {
        if ($(this).scrollTop() > 600) {
            $('.back-to-top').fadeIn(200)
        } else {
            $('.back-to-top').fadeOut(200)
        }
    });

    //Animate the scroll to top
    $('.back-to-top').on('click', function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0,
        }, 0);
    });


})(jQuery);

document.querySelectorAll('.header-search form').forEach(function(form) {
    var input = form.querySelector('input[type="search"]');
    var searchContainer = form.closest('.header-search');

    if (!input || !searchContainer) {
        return;
    }

    var resultsPanel = document.createElement('div');
    resultsPanel.className = 'site-search-results';
    resultsPanel.hidden = true;
    resultsPanel.setAttribute('role', 'region');
    resultsPanel.setAttribute('aria-label', 'Search results');
    resultsPanel.setAttribute('aria-live', 'polite');
    searchContainer.appendChild(resultsPanel);

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var terms = input.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
        if (!terms.length) {
            resultsPanel.hidden = true;
            return;
        }

        var sections = Array.from(document.querySelectorAll('section'));
        var matches = sections.filter(function(section) {
            var text = section.textContent.toLocaleLowerCase();
            return terms.every(function(term) {
                return text.includes(term);
            });
        });

        resultsPanel.replaceChildren();
        var title = document.createElement('p');
        title.className = 'site-search-results__title';
        title.textContent = matches.length
            ? matches.length + (matches.length === 1 ? ' matching section' : ' matching sections')
            : 'No matching section found on this page.';
        resultsPanel.appendChild(title);

        matches.forEach(function(section) {
            var heading = section.querySelector('h1, h2, h3, h4, h5, h6');
            var result = document.createElement('button');
            result.type = 'button';
            result.className = 'site-search-results__item';
            result.textContent = heading ? heading.textContent.trim() : 'Matching section';
            result.addEventListener('click', function() {
                document.querySelectorAll('.site-search-highlight').forEach(function(element) {
                    element.classList.remove('site-search-highlight');
                });
                section.classList.add('site-search-highlight');
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                resultsPanel.hidden = true;
                window.setTimeout(function() {
                    section.classList.remove('site-search-highlight');
                }, 2200);
            });
            resultsPanel.appendChild(result);
        });

        resultsPanel.hidden = false;
    });
});


// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('ecour_theme', themeName);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('ecour_theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}

// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('ecour_theme') === 'theme-dark') {
        setTheme('theme-dark');
        document.getElementById('slider').checked = false;
    } else {
        setTheme('theme-light');
        document.getElementById('slider').checked = true;
    }
})();