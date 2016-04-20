import angular from 'angular';
import angularMeteor from 'angular-meteor';
import tweetsList from '../imports/components/tweetsList/tweetsList';

angular.module('simple-tweets', [
  angularMeteor,
  tweetsList.name
]);
