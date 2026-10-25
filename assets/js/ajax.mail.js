// Ajax mail js
$(function() {

    var form = $('#contact-form');
    var formMessages = $('.form-message');

    $(form).submit(function(e) {
        e.preventDefault();

        var formData = $(form).serialize();

        $.ajax({
            type: 'POST',
            url: $(form).attr('action'), // should be send_email.php
            data: formData,
            dataType: 'json' // expecting JSON response
        })
        .done(function(response) {
            $(formMessages).removeClass('error');
            $(formMessages).addClass('success');

            // Use response message
            $(formMessages).text(response.message);

            // Clear the form if successful
            if(response.status === 'success'){
                $('#contact-form')[0].reset();
            }
        })
        .fail(function(data) {
            $(formMessages).removeClass('success');
            $(formMessages).addClass('error');

            if (data.responseJSON && data.responseJSON.message) {
                $(formMessages).text(data.responseJSON.message);
            } else {
                $(formMessages).text('Oops! An error occurred and your message could not be sent.');
            }
        });
    });

});