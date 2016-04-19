import '../imports/api/tasks.js';

var Twitter = Meteor.npmRequire("twitter");
var conf = JSON.parse(Assets.getText('twitter.json'));
var twit = new Twitter({
  consumer_key: conf.consumer.key,
    consumer_secret: conf.consumer.secret,
    access_token_key: conf.access_token.key,
    access_token_secret: conf.access_token.secret
});

twit.stream('statuses/filter', {
  'track': conf.hashtag
}, function(stream) {
  stream.on('data', function(data) {
    console.log(data);
  });
});
