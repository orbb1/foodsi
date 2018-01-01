(function main($) {
    var appendCarousel = function() {
        $('.carousel').slick({
            arrows: true,
            centerMode: true,
            centerPadding: '20px',
            infinite: true,
            slidesToScroll: 3,
            slidesToShow: 1,
            variableWidth: true
          });
    };

    var onRegister = function() {
        
    }

    appendCarousel();
    
})(jQuery);