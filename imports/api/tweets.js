import { Mongo } from 'meteor/mongo';

export const Tweets = new Mongo.Collection('tweets');
export const PopularTweets = new Mongo.Collection('popularTweets');
