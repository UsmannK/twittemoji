import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Tweets } from '../../api/tweets.js';
import template from './tweetsList.html';

class TweetsListCtrl {

  constructor($scope) {
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
