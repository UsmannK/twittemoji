import '../imports/api/tweets.js';
import loadTweets from './loaders/tweets.js';

Meteor.startup(()=> {
  loadTweets();
});
