/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function

var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "<script>alert('uh oh!');</script>"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];
*/
$(document).ready(function() {



function loadTweets(){

  $.ajax({
        url: 'http://localhost:8080/tweets',
        method: 'GET',
      }).then(function (res) {
        // tell the user that the server successfully added this image to their "liked images"
       // console.log('Successfully added ' + res);
        renderTweets(res);
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

var $tweet = $("<article>").addClass("tweet");
const $header = $('<header>');
const $username = $('<h2>').text(userData.user.name);
const $avatar = $('<img>').attr('src', userData.user.avatars.small);
const $span1 = $('<span>').text(userData.user.handle);
const $span2 = $('<span>').text(millisToDaysHoursMinutes(diffrence));
const $footer = $('<footer>');
const $main = $(`<p>${escape(userData.content.text)}<p>`);
const $iconsheart = $("<i>").addClass("fa").addClass("fa-heartbeat").attr("aria-hidden",true);
const $iconsretweet = $("<i>").addClass("fa").addClass("fa-retweet").attr("aria-hidden",true);
const $iconsflag = $("<i>").addClass("fa").addClass("fa-flag").attr("aria-hidden",true);
$tweet.append($header);
$tweet.append($main);
$tweet.append($footer);
// escape(userData.content.text)
$header.append($avatar,$username, $span1);
$footer.append($span2,$iconsheart,$iconsretweet,$iconsflag);
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

    return (days) + "dayes, " + Math.round(hours) + "hours ago!"  ;
}


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

  if(!($inputTweet.length == 0)){

    if(parseInt($('.counter').text(), 10)>=0){
      $.ajax({
          method: 'POST',
          url: 'http://localhost:8080/tweets',
          data: $(this).serialize(),

      }).then(function (res) {
        // tell the user that the server successfully added this image to their "liked images"
        //alert('Successfully added ' + res);
      }).fail(function (err) {
        console.log(err);
        alert('failed');
      });
//----------- Get in the listener--------------------
      $.ajax({
        url: 'http://localhost:8080/tweets',
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
      alert('you have exceeded the max char allowed')
    }
  } else {
    alert('you need to enter something!')
  }




});

  var $button = $('#compose-button');
    $button.on('click', function () {
      console.log("button pressed")
      $( ".new-tweet" ).slideToggle();
      $('#text').select();
  });

});


