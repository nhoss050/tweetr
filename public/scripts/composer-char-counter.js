$( document ).ready(function() {
    // console.log( "ready!" );
    // console.log($(".new-tweet").find("textarea").text());
    var counter = $('.new-tweet .counter');
    var max = parseInt(counter.text(), 10);

    $(".new-tweet").find("textarea").on('input', function(event)
    {
      var sentenceSize = $(this).val().length;
      $('.new-tweet .counter').css('color', 'black');
      if(max - sentenceSize >= 0) {
      $('.new-tweet .counter').text(max - sentenceSize);
      } else {
      $('.new-tweet .counter').css('color', 'red');
      $('.new-tweet .counter').text(max - sentenceSize);
    }
 });



});