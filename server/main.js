import '../imports/api/tweets.js';
import { Tweets } from '../imports/api/tweets.js';

var Twitter = Meteor.npmRequire("twitter");
var conf = JSON.parse(Assets.getText('twitter.json'));
var twit = new Twitter({
  consumer_key: conf.consumer.key,
    consumer_secret: conf.consumer.secret,
    access_token_key: conf.access_token.key,
    access_token_secret: conf.access_token.secret
});

twit.stream('statuses/filter', {
  'locations': '-180,-90, 180, 90'
  }, function(stream) {
  stream.on('data', Meteor.bindEnvironment( function(data) {
    console.log(data['text']);
    Tweets.insert({
      text: data['text'],
      createdAt: data['timestamp_ms']
    });
  }));
});
