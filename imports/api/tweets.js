import { Mongo } from 'meteor/mongo';

export const Tweets = new Mongo.Collection('tweets');
export const PopularTweets = new Mongo.Collection('popularTweets');
export const AllEmoji = new Mongo.Collection('allTweets');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tweets', function tasksPublication() {
    return Tweets.find();
  });

  Meteor.publish('popularTweets', function tasksPublication() {
    return PopularTweets.find();
  });
  
  Meteor.publish('countries', function tasksPublication() {
    return Tweets.find({}, {limit: 10, fields: {'country':1}, sort:{count: -1}});;
  });
}
