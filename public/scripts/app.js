/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
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
      "text": "Je pense , donc je suis"
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

$(document).ready(function() {


function renderTweets(tweets) {
  // loops through tweets
  for (eachuser of tweets){
    $(".articlecont").append(createTweetElement(eachuser));
  }

    // takes return value and appends it to the tweets container
}


function createTweetElement(userData) {

var $tweet = $("<article>").addClass("tweet");
const $header = $('<header>');
const $username = $('<h2>').text(userData.user.name);
const $avatar = $('<img>').attr('src', userData.user.avatars.small);
const $span1 = $('<span>').text(userData.user.handle);
const $span2 = $('<span>').text(userData.created_at);
const $footer = $('<footer>');
const $main = $("<p>").text(userData.content.text);
const $iconsheart = $("<i>").addClass("fa").addClass("fa-heartbeat").attr("aria-hidden",true);
const $iconsretweet = $("<i>").addClass("fa").addClass("fa-retweet").attr("aria-hidden",true);
const $iconsflag = $("<i>").addClass("fa").addClass("fa-flag").attr("aria-hidden",true);
$tweet.append($header);
$tweet.append($main);
$tweet.append($footer);

$header.append($avatar,$username, $span1);
$footer.append($span2,$iconsheart,$iconsretweet,$iconsflag);
return $tweet;
}
//var $tweet = createTweetElement(tweetData);

renderTweets(data);
  });


