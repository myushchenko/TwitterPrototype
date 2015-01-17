/// <reference path="../../app/index.d.ts" />

module App {
    'use strict';

    export class EndpointService {
        public static $inject = ['$q', '$resource', '$http'];

        public baseUrl = 'http://localhost:12818/api/';

        constructor(private $q: ng.IQService, private $resource, private $http: ng.IHttpService) {
            this.$resource = $resource(this.baseUrl, {}, {
                getAllUsers: {
                    method: 'GET',
                    url: this.baseUrl + 'twitter/users',
                    isArray: true
                },
                createUser: {
                    method: 'POST',
                    url: this.baseUrl + 'twitter/user/create',
                },
                getGlobalFeed: {
                    method: 'GET',
                    url: this.baseUrl + 'twitter/users/feed',
                    isArray: true
                },
                postMessage: {
                    method: 'POST',
                    url: this.baseUrl + 'twitter/user/post',
                },
                follow: {
                    method: 'POST',
                    url: this.baseUrl + 'twitter/user/follow',
                },
                unfollow: {
                    method: 'POST',
                    url: this.baseUrl + 'twitter/user/unfollow',
                }
            });
        }

        public getAllUsers() {
            return this.$resource.getAllUsers().$promise;
        }

        public createUser(user: UserDto) {
            return this.$resource.createUser(user).$promise;
        }

        public postMessage(post: PostDto) {
            return this.$resource.postMessage(post).$promise;
        }

        public getFeed(userId: number) {
            return this.$http.get(this.baseUrl + 'twitter/users/' + userId + '/feed');
        }

        public getGlobalFeed() {
            return this.$resource.getGlobalFeed().$promise;
        }

        public follow(follow: FollowDto) {
            return this.$resource.follow(follow).$promise;
        }

        public unfollow(follow: FollowDto) {
            return this.$resource.unfollow(follow).$promise;
        }

        public getFollowed(userId: number) {
            return this.$http.get(this.baseUrl + 'twitter/users/' + userId + '/followed');
        }
    }

    angular.module('App').service('EndpointService', EndpointService);

}