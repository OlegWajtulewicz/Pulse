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
  });
      


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