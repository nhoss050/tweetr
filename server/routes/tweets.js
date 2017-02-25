"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body 1' });
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      numberOfLikes : 0,
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send('good job');
      }
    });
  });


  tweetsRoutes.post("/likes/", function(req, res) {

    console.log("body of request is:",req.body.likes);
     if (!req.body) {
       res.status(400).json({ error: 'invalid request: no data in POST body 2'});
       return;
     }

     const liker = req.body.liker ? req.body.liker : userHelper.generateRandomUser();
     console.log("liker new name is:",liker.name);
    // var userIs = db.collection("tweets").find({""})

    //function getTweetsByText(callback) {
    //db.collection("tweets").find({"content": req.body.tweet});
    //}
    var contentSend = {"content": {
      "text": req.body.tweet,
    }}
    DataHelpers.getTweetByText(contentSend,(err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {


        var newNumberOfLikes = tweets[0]["numberOfLikes"];
          newNumberOfLikes = (newNumberOfLikes)+1;
        DataHelpers.updateLikes(tweets[0]["_id"],newNumberOfLikes)
        console.log(tweets);
        res.sendStatus(201);


      }
    });

  });


  return tweetsRoutes;

}
