import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Tweets } from '../../api/tweets.js';
import { PopularTweets } from '../../api/tweets.js';
import template from './tweetsList.html';

class TweetsListCtrl {

  constructor($scope) {

    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 2 };


    $scope.viewmode="recent";

    $scope.changeDisplayMode = function(newMode)
    {
       $scope.viewmode = newMode; 
    }

    $scope.markers = [];
    $scope.markers.push({
            _id: 1,
            emoji: '1f609',
            coords: {
              latitude: 36.132411,
              longitude: -80.290481
            }
      });  
    $scope.markers.push({
            _id: 2,
            emoji: '1f607',
              coords: {
                latitude: 32.132411,
                longitude: 80.290481
        }});           

    $scope.markers.forEach(function(each)
    {
      //todo: mongo virtual
      each.icon = "/images/emoji/"+each.emoji+".png"
    });

    $scope.viewModel(this);

    this.helpers({
      tweets() {
        return Tweets.find({});
      },
      populartweets() {
        return PopularTweets.find({});
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
