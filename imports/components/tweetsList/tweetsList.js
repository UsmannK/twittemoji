import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Tweets } from '../../api/tweets.js';
import template from './tweetsList.html';

class TweetsListCtrl {

  constructor($scope) {

    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 1 };

    $scope.markers = [];
    $scope.markers.push({
            idKey: 1,
              coords: {
                latitude: 36.132411,
                longitude: -80.290481
        }});  

    $scope.markers.push({
            idKey: 2,
              coords: {
                latitude: 32.132411,
                longitude: -80.290481
        }});           


    $scope.viewModel(this);

    this.helpers({
      tweets() {
        return Tweets.find({});
      }
    })
  }
}

export default angular.module('tweetsList', [
      angularMeteor
    ])

.component('tweetsList', {
  templateUrl: 'imports/components/tweetsList/tweetsList.html',
  controller: ['$scope', TweetsListCtrl] 
});
