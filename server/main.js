import '../imports/api/tweets.js';
import loadTweets from './loaders/tweets.js';

Meteor.startup(()=> {
  loadTweets();
});

Meteor.methods({
  logToConsole: function(msg) {
    console.log(msg)
  }
});
