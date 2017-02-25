"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {



    // Saves a tweet to `db`
    saveTweet: function(callback) {
       db.collection("tweets").insertOne(callback);


    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
       db.collection("tweets").find().toArray(callback);
    },

    getTweetByText: function(content,callback) {
       db.collection("tweets").find(content).toArray(callback);
    },

    updateLikes: function(ID, newLikes) {
       db.collection("tweets").update({ _id:ID},{ $set: { "numberOfLikes" : newLikes}})
       console.log(`updateLikes is called and the id is ${ID} and calls are ${newLikes}`);
    },


  };
}
