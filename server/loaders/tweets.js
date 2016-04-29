import { Tweets } from '../../imports/api/tweets.js';
import { PopularTweets } from '../../imports/api/tweets.js';

var num = 0;
var Twitter = Meteor.npmRequire("twitter");
var conf = JSON.parse(Assets.getText('twitter.json'));
var country_locs = JSON.parse(Assets.getText('country_locs.json'));
var emojiRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF])/;
var twit = new Twitter({
  consumer_key: conf.consumer.key,
    consumer_secret: conf.consumer.secret,
    access_token_key: conf.access_token.key,
    access_token_secret: conf.access_token.secret
});

//Method taken from StackOverflow!! Trust? (http://stackoverflow.com/questions/32597856/encode-emoji-to-unicode-code-point-php-js)
function e2u(str){
    str = str.replace(/\ufe0f|\u200d/gm, ''); // strips unicode variation selector and zero-width joiner
    var i = 0, c = 0, p = 0, r = [];
    while (i < str.length){
        c = str.charCodeAt(i++);
        if (p){
            r.push((65536+(p-55296<<10)+(c-56320)).toString(16));
            p = 0;
        } else if (55296 <= c && c <= 56319){
            p = c;
        } else {
            r.push(c.toString(16));
        }
    }
    return r.join('-');
}

function createDocument(data) {
  if(!data.hasOwnProperty('text'))
    return null;
  var emoji_matches = data['text'].match(emojiRegex);
  if(emoji_matches != null) { 
    var emoji = emoji_matches[0];
    var country_code = data['place']['country_code'];
    var lat = country_locs[country_code][0]; 
    var lon = country_locs[country_code][1]; 
    var doc = {
      'emoji':e2u(emoji),
      'coords': {
        'latitude': lat,
        'longitude': lon
      },
      'country': country_code
    }
    return doc;
  }

  return null;
}

function streamTweets() {
  twit.stream('statuses/filter', {
    'locations': '-180,-90, 180, 90'
  }, function(stream) {
    stream.on('data', Meteor.bindEnvironment( function(data) {
      
      /*if(num++ % 3 != 0) {
        //console.log(num);
        return;
      }*/

      var doc = createDocument(data);
      if(doc != null) {
        var emojiCode = doc['emoji'];
        var field = "emoji." + emojiCode;
        var inc = {};
        inc[field] = 1;
        
        var incCount = {};
        incCount['count'] = 1;
        Tweets.upsert({
          'country':doc['country']
        }, { 
          $set:{
            'country': doc['country'],
            'emoji': doc['emoji'],
            'coords': doc['coords'],
            'icon': "/images/emoji/"+doc['emoji']+".png"
          },
          $inc: incCount
        });

        PopularTweets.upsert({
          'country':doc['country']
        }, { 
          $set: {
            'coords':doc['coords']
          },
          $inc: inc 
        });

        var maxNum = 0;
        var maxCode;
        var emojis = PopularTweets.findOne({'country':doc['country']});
        for(var key in emojis['emoji']) {
          //console.log(" --" + key + " -- " + emojis['emoji'][key] + "-- ");
          var num = emojis['emoji'][key];
          if(num > maxNum) {
            maxNum = num;
            maxCode = key;
          }
        }
        //console.log("("+maxCode+")");
        PopularTweets.upsert({
          'country':doc['country']
        }, {
          $set:{
            'icon': "/images/emoji/"+maxCode+".png"
          }
        });

      }
    }));
  });
}

export default function() { 
  streamTweets();
}
