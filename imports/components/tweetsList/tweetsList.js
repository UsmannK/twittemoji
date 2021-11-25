import angular from "angular";
import angularMeteor from "angular-meteor";
import { Tweets } from "../../api/tweets.js";
import { PopularTweets } from "../../api/tweets.js";
import template from "./tweetsList.html";

class TweetsListCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.subscribe("tweets");
    this.subscribe("popularTweets");
    this.subscribe("countries");

    let country_list = Tweets.find();
    Meteor.call("logToConsole", Tweets.find({}).fetch()); //.fetch());

    // $scope.opts = {scaleBeginAtZero:false};
    /*var country_list = Tweets.find().fetch();
  Meteor.call("logToConsole", Tweets.find({}).fetch());//.fetch());
  console.log(country_list.length);
  country_list.forEach(function(doc) {
    console.log(doc.country);
  });
  */
    //$scope.labels = country_list
    $scope.labels = ["default"];
    $scope.series = ["Series A"];

    Tracker.autorun(function () {
      $scope.labels = [];
      $scope.data = [];
      var countryCursor = Tweets.find(
        { sentiment: { $exists: true } },
        { limit: 10, fields: { country: 1, sentiment: 1 }, sort: { count: -1 } }
      );
      var i = 0;
      countryCursor.forEach(function (data) {
        $scope.data[i] = data.sentiment;
        $scope.labels[i++] = data.country;
      });
    });

    function exec() {
      var arr = [];
      for (var i = 0, t = 9; i < t; i++) {
        arr.push(Math.round(Math.random() * t));
      }

      $scope.data = [arr];
      setTimeout(exec, 2000 + Math.round(Math.random() * 1000));
    }

    exec();

    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 2 };

    $scope.viewmode = "recent";

    $scope.changeDisplayMode = function (newMode) {
      $scope.viewmode = newMode;
    };

    $scope.viewModel(this);

    this.helpers({
      tweets() {
        return Tweets.find({});
      },
      populartweets() {
        return PopularTweets.find({});
      },
      countryNames() {
        return Tweets.find(
          {},
          { limit: 10, fields: { country: 1 }, sort: { count: -1 } }
        );
      },
    });
  }
}

export default angular
  .module("tweetsList", [angularMeteor])

  .component("tweetsList", {
    templateUrl: "imports/components/tweetsList/tweetsList.html",
    controller: ["$scope", TweetsListCtrl],
  });
