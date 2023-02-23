$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 700,
        //adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left-solid.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right-solid.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                  dots: true,
                  arrows: false
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });


    function toggleSlide (item) {
      $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

        //modal

    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
    
    $('.button_mini').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
      })
    });



    function valideForms(form) {
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Пожалуйста введите своё имя",
            minlength: jQuery.validator.format("Введите {0} символа!")
          }, 
          phone: "Пожалуйста введите свой телефон",
          email: {
            required: "Пожалуйста введите свой адрес",
            email: "Неправильный адрес"
          }
        }
      });
    };

    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    // валидация тел
    $('input[name=phone]').mask("(48)999-999-999");

    // отправка писем
    $('form').submit(function(e) {
      e.preventDefault();

      if (!$(this).valid()) {
        return;
      }

      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
      });
      return false; 
    });

    //smooth scroll pageup

    $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });

    //smooth scrolling to all links

    $(document).ready(function(){
      // Add smooth scrolling to all links
      $("a").on('click', function(event) {
    
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();
    
          // Store hash
          let hash = this.hash;
    
          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 900, function(){
    
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        } // End if
      });
    });

    //second smooth

    // $("a[href^='#']").click(function() {
    //   const _href = $(this).attr("href");
    //   $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    //   return false;
    // });
      // аниция
    new WOW().init();
 
     //анимация
    AOS.init({
      disable: {
        mobile: true
      } 
    });

    //burger-menu
    window.addEventListener('DOMContentLoaded', () => {
      const menu = document.querySelector('.main-navigation'),
      menuItem = document.querySelectorAll('.main-navigation_item'),
      burger = document.querySelector('.burger');
  
      burger.addEventListener('click', () => {
          burger.classList.toggle('burger_active');
          menu.classList.toggle('main-navigation_active');
      });
  
      menuItem.forEach(item => {
        item.addEventListener('click', () => {
              burger.classList.toggle('burger_active');
              menu.classList.toggle('main-navigation_active');
          })
      })
  })

});
      


        



      // tiny slider
// var slider = tns({
//     container: '.carousel__inner',
//     items: 1,
//     slideBy: 'page',
//     controls: false,
//     nav: false
//   })
// document.querySelector('.prev').addEventListener('click', function () {
//     slider.goTo('prev');
// });
// document.querySelector('.next').addEventListener('click', function () {
//     slider.goTo('next');
// }); 