$(document).ready(function() {






//var $tweet = createTweetElement(tweetData);

loadTweets();

//Ajax receiving submit

var $form = $('#target');
console.log($form);


$form.on("submit",function(event) {
  event.preventDefault();
  var $inputTweet = $('#text').val();
  //console.log("the length of the counter is :", parseInt($('.counter').text(), 10))
  console.log("input is:",$inputTweet);


  if(!($inputTweet.trim().length == 0)){

    if(parseInt($('.counter').text(), 10)>=0){
      $.ajax({
          method: 'POST',
          url: '/tweets',
          data: $(this).serialize(),

      }).then(function (res) {
        // tell the user that the server successfully added this image to their "liked images"
        //alert('Successfully added ' + res);
      }).fail(function (err) {
        console.log(err);
        alert('failed 1');
      });
//----------- Get in the listener--------------------
      $.ajax({
        url: '/tweets',
        method: 'GET',
      }).then(function (res) {
        // tell the user that the server successfully added this image to their "liked images"
       // console.log('Successfully added ' + res);
        $(".articlecont").empty();
        renderTweets(res);
        //console.log(res)
      }).fail(function (err) {
        console.log(err);
        alert('failed');
      });


    } else {
      alert('Exceeded the Maximum characters allowed')
    }
  } else {
    alert('Please enter something!')
  }


$('#text').val('');
$('.new-tweet .counter').text('140').css('color', 'black');
});

  var $button = $('#compose-button');
    $button.on('click', function () {
      console.log("button pressed")
      $( ".new-tweet" ).slideToggle();
      $('#text').select();
  });

$("body").on('click', '.tweet .fa-heartbeat', function(event)
    {
      $.ajax({
          method: 'POST',
          url: '/tweets/likes',
          data: {
            tweet: $(this).parent().parent().find('p').text(),
            likes: true,
            id: $(this).parent().parent().attr('id'),

          }
      }).then(function (res) {
        // tell the user that the server successfully added this image to their "liked images"
        //alert('Successfully added ' + res);
      }).fail(function (err) {
        console.log(err);
        alert('failed');
      });

        $.ajax({
        url: '/tweets',
        method: 'GET',
      }).then(function (res) {
        // tell the user that the server successfully added this image to their "liked images"
       // console.log('Successfully added ' + res);
        $(".articlecont").empty();
        renderTweets(res);
        //console.log(res)
      }).fail(function (err) {
        console.log(err);
        alert('failed');
      });


      var $h2 = $('h2')
      console.log($(this).parent().parent().attr('id'));
    });



///////////  functions
function loadTweets(){

  $.ajax({
        url: '/tweets',
        method: 'GET',
      }).then(function (res) {
        // tell the user that the server successfully added this image to their "liked images"
       // console.log('Successfully added ' + res);
        renderTweets(res);
        // $(".tweet").on('click', function(event)
        // {
        // console.log('nima you got it!')
        // });

        //console.log(res)
      }).fail(function (err) {
        console.log(err);
        alert('failed');
      });

  }


function renderTweets(receivedTweets) {
  // loops through tweets
  for (eachuser of receivedTweets) {
    $(".articlecont").prepend(createTweetElement(eachuser));
  }

    // takes return value and appends it to the tweets container
}


function createTweetElement(userData) {

var firstDate = new Date(userData.created_at)
var secondDate = new Date();
var diffrence = secondDate -firstDate;
// console.log(millisToDaysHoursMinutes(diffrence))
//const datedif = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));

var $tweet = $("<article>").addClass("tweet").attr("id",userData._id);
const $header = $('<header>');
const $username = $('<h2>').text(userData.user.name);
const $avatar = $('<img>').attr('src', userData.user.avatars.small);
const $span1 = $('<span>').text(userData.user.handle);
const $span2 = $('<span>').text(millisToDaysHoursMinutes(diffrence));
const $footer = $('<footer>');
//const $main = $(`<p>${escape(userData.content.text)}<p>`);
const $main = $('<p>').text(userData.content.text);
const $iconsheart = $("<i>").addClass("fa").addClass("fa-heartbeat").attr("aria-hidden",true);
const $iconsretweet = $("<i>").addClass("fa").addClass("fa-retweet").attr("aria-hidden",true);
const $iconsflag = $("<i>").addClass("fa").addClass("fa-flag").attr("aria-hidden",true);
const $span3 = $('<span>').addClass("likes").text(userData.numberOfLikes);
$tweet.append($header);
$tweet.append($main);
$tweet.append($footer);
// escape(userData.content.text)
$header.append($avatar,$username, $span1);
$footer.append($span2, $span3,$iconsheart,$iconsretweet,$iconsflag);

return $tweet;
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;

}

function millisToDaysHoursMinutes(millis) {
    var seconds = millis / 1000;
    var totalMinutes = seconds / 60;

    var days = totalMinutes / 1440;
    totalMinutes -= 1440 * days;
    var hours = totalMinutes / 60;
    totalMinutes -= hours * 60;
    days = Math.round(days);

    return (days) + "dayes ago ";
}




});





