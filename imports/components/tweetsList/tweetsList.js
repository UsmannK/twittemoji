import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Tweets } from '../../api/tweets.js';
import { PopularTweets } from '../../api/tweets.js';
import template from './tweetsList.html';

class TweetsListCtrl {

  constructor($scope) {


    // $scope.opts = {scaleBeginAtZero:false};

    $scope.labels = ['russia','china','usa','uk','argentina','japan','brazil','south africa','austrailia'];
  $scope.series = ['Series A'];



  
function exec()
{
  var arr = [];
  for (var i=0, t=9; i<t; i++) {
      arr.push(Math.round(Math.random() * t))
  }

  $scope.data =[arr];
  setTimeout(exec, 2000+Math.round(Math.random()*1000));
}

exec();


    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 2 };


    $scope.viewmode="recent";

    $scope.changeDisplayMode = function(newMode)
    {
       $scope.viewmode = newMode; 
    }

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
