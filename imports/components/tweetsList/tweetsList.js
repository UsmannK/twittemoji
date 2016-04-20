import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Tweets } from '../../api/tweets.js';
import template from './tweetsList.html';

class TodosListCtrl {

  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
      tasks() {
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
