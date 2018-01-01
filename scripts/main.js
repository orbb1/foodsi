(function main($) {

    var API_URL = 'https://foodsi-stage.applover.pl/api/v1/auth',
        $form = $('.registration-form');

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

    var onRegister = function(e) {
        $.ajax({
            url: API_URL,
            type: 'POST',
            data: new FormData(this),
            success: function (res, status, xhr) {
                console.log(res)
            },
            error: function (xhr, status, error) {
                console.log(error, status)
            },
            processData: false,
            contentType: false
        });
        e.preventDefault();
    }

    $form.on('submit', onRegister);
    appendCarousel();
    
})(jQuery);