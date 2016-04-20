import angular from 'angular';
import angularMeteor from 'angular-meteor';
import tweetsList from '../imports/components/tweetsList/tweetsList';
import 'angular-google-maps';
import 'angular-simple-logger';

angular.module('simple-tweets', [
  angularMeteor,
  tweetsList.name,
  'nemLogging',
  'uiGmapgoogle-maps'
]);


