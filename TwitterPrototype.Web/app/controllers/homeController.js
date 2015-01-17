/// <reference path="../index.d.ts" />
var App;
(function (App) {
    'use strict';

    var HomeController = (function () {
        function HomeController($scope, $rootScope, endpoint) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.endpoint = endpoint;
            this.currentUser = null;
            this.posts = [];
            this.users = [];
            this.follows = [];
            this.isShowFollowed = false;
            this.init();
        }
        HomeController.prototype.init = function () {
            var _this = this;
            this.endpoint.getAllUsers().then(function (response) {
                _this.users = [];

                angular.forEach(response, function (user) {
                    var userDto = new App.UserDto();
                    userDto.name = user.Name;
                    userDto.id = user.Id;
                    _this.users.push(userDto);
                });
            });
        };

        HomeController.prototype.onChangeUser = function () {
            var _this = this;
            this.follows = [];
            this.isShowFollowed = false;

            this.endpoint.getFollowed(this.currentUser.id).then(function (response) {
                angular.forEach(_this.users, function (user) {
                    if (user.id != _this.currentUser.id) {
                        var followId = _this.getFollowedId(response.data, user);
                        var follow = new App.Follow();
                        follow.id = followId;
                        follow.userId = user.id;
                        follow.userName = user.name;
                        follow.isFollowed = followId > 0 ? true : false;
                        _this.follows.push(follow);
                    }
                });
            });
        };

        HomeController.prototype.onFollow = function (follow) {
            var _this = this;
            var followDto = new App.FollowDto();
            followDto.followingUserId = this.currentUser.id;
            followDto.followedUserId = follow.userId;

            this.endpoint.follow(followDto).then(function () {
                _this.onChangeUser();
                alert('User, has been followed');
            }, function () {
                return alert('An error occurred');
            });
        };

        HomeController.prototype.onUnFollow = function (follow) {
            var _this = this;
            var followDto = new App.FollowDto();
            followDto.id = follow.id;

            this.endpoint.unfollow(followDto).then(function () {
                _this.onChangeUser();
                alert('User, has been unfollowed');
            }, function () {
                return alert('An error occurred');
            });
        };

        HomeController.prototype.onCreateUser = function () {
            var _this = this;
            var user = new App.UserDto();
            user.name = this.userName;

            this.endpoint.createUser(user).then(function () {
                _this.userName = '';
                _this.init();
                alert('User, has been created');
            }, function () {
                return alert('An error occurred');
            });
        };

        HomeController.prototype.onPostMessage = function () {
            var _this = this;
            var post = new App.PostDto();
            post.message = this.message;
            post.userId = this.currentUser.id;

            this.endpoint.postMessage(post).then(function () {
                _this.message = '';
                alert('Message, has been saved');
            }, function (error) {
                alert(error.data.ExceptionMessage);
            });
        };

        HomeController.prototype.onGetFeed = function () {
            var _this = this;
            this.endpoint.getFeed(this.currentUser.id).then(function (response) {
                _this.initPosts(response.data);
            });
        };

        HomeController.prototype.onGetGlobalFeed = function () {
            var _this = this;
            this.endpoint.getGlobalFeed().then(function (response) {
                _this.initPosts(response);
            });
        };

        HomeController.prototype.initPosts = function (posts) {
            var _this = this;
            this.posts = [];
            angular.forEach(posts, function (post) {
                var postDto = new App.PostDto();
                postDto.message = post.Message;
                _this.posts.push(postDto);
            });
        };

        HomeController.prototype.getFollowedId = function (followed, user) {
            var _this = this;
            var followedId = 0;

            angular.forEach(followed, function (item) {
                if (item.FollowedUserId == user.id) {
                    followedId = item.Id;
                    _this.isShowFollowed = true;
                }
            });

            return followedId;
        };
        HomeController.$inject = ['$scope', '$rootScope', 'EndpointService'];
        return HomeController;
    })();
    App.HomeController = HomeController;

    angular.module('App').controller('HomeController', HomeController);
})(App || (App = {}));
//# sourceMappingURL=homeController.js.map
