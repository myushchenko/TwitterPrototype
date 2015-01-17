/// <reference path="../index.d.ts" />

module App {
    'use strict';

    export class HomeController {

        public static $inject = ['$scope', '$rootScope', 'EndpointService'];

        public userName: string;
        public message: string;
        public currentUser: UserDto = null;
        public posts = [];
        public users = [];
        public follows = [];
        public isShowFollowed = false;

        constructor(private $scope: ng.IScope, private $rootScope, private endpoint: EndpointService) {
            this.init();
        }

        private init() {
            this.endpoint.getAllUsers().then((response) => {
                this.users = [];

                angular.forEach(response, (user: any) => {
                    var userDto = new UserDto();
                    userDto.name = user.Name;
                    userDto.id = user.Id;
                    this.users.push(userDto);
                });
            });
        }

        public onChangeUser() {
            this.follows = [];
            this.isShowFollowed = false;

            this.endpoint.getFollowed(this.currentUser.id).then((response) => {

                angular.forEach(this.users, (user: UserDto) => {
                    if (user.id != this.currentUser.id) {
                        var followId = this.getFollowedId(response.data, user);
                        var follow = new Follow();
                        follow.id = followId;
                        follow.userId = user.id;
                        follow.userName = user.name;
                        follow.isFollowed = followId > 0 ? true : false;
                        this.follows.push(follow);
                    }
                });
            });
        }

        public onFollow(follow: Follow) {
            var followDto = new FollowDto();
            followDto.followingUserId = this.currentUser.id;
            followDto.followedUserId = follow.userId;

            this.endpoint.follow(followDto)
                .then(() => {
                    this.onChangeUser();
                    alert('User, has been followed');
                }, () => alert('An error occurred'));
        }

        public onUnFollow(follow: Follow) {
            var followDto = new FollowDto();
            followDto.id = follow.id;

            this.endpoint.unfollow(followDto)
                .then(() => {
                    this.onChangeUser();
                    alert('User, has been unfollowed');
                }, () => alert('An error occurred'));
        }

        public onCreateUser() {
            var user = new UserDto();
            user.name = this.userName;

            this.endpoint.createUser(user)
                .then(() => {
                    this.userName = '';
                    this.init();
                    alert('User, has been created');
                }, () => alert('An error occurred'));
        }

        public onPostMessage() {
            var post = new PostDto();
            post.message = this.message;
            post.userId = this.currentUser.id;

            this.endpoint.postMessage(post)
                .then(() => {
                    this.message = '';
                    alert('Message, has been saved');
                }, (error) => {
                alert(error.data.ExceptionMessage);
            });
        }

        public onGetFeed() {
            this.endpoint.getFeed(this.currentUser.id).then((response) => {
                this.initPosts(response.data);
            });
        }

        public onGetGlobalFeed() {
            this.endpoint.getGlobalFeed().then((response) => {
                this.initPosts(response);
            });
        }

        private initPosts(posts: any) {
            this.posts = [];
            angular.forEach(posts, (post: any) => {
                var postDto = new PostDto();
                postDto.message = post.Message;
                this.posts.push(postDto);
            });
        }

        private getFollowedId(followed: any, user: UserDto) {
            var followedId = 0;

            angular.forEach(followed, (item: any) => {
                if (item.FollowedUserId == user.id) {
                    followedId = item.Id;
                    this.isShowFollowed = true;
                }
            });

            return followedId;
        }

    }

    angular.module('App').controller('HomeController', HomeController);
}