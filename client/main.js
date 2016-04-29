import angular from 'angular';
import angularMeteor from 'angular-meteor';
import tweetsList from '../imports/components/tweetsList/tweetsList';
import 'angular-google-maps';
import 'angular-simple-logger';
import 'angular-chart.js';

angular.module('simple-tweets', [
  angularMeteor,
  tweetsList.name,
  'nemLogging',
  'uiGmapgoogle-maps',
  'chart.js'
]);

function onReady() {
  angular.bootstrap(document, ['simple-tweets']);
}

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}
