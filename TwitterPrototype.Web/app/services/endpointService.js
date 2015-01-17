/// <reference path="../../app/index.d.ts" />
var App;
(function (App) {
    'use strict';

    var EndpointService = (function () {
        function EndpointService($q, $resource, $http) {
            this.$q = $q;
            this.$resource = $resource;
            this.$http = $http;
            this.baseUrl = 'http://localhost:12818/api/';
            this.$resource = $resource(this.baseUrl, {}, {
                getAllUsers: {
                    method: 'GET',
                    url: this.baseUrl + 'twitter/users',
                    isArray: true
                },
                createUser: {
                    method: 'POST',
                    url: this.baseUrl + 'twitter/user/create'
                },
                getGlobalFeed: {
                    method: 'GET',
                    url: this.baseUrl + 'twitter/users/feed',
                    isArray: true
                },
                postMessage: {
                    method: 'POST',
                    url: this.baseUrl + 'twitter/user/post'
                },
                follow: {
                    method: 'POST',
                    url: this.baseUrl + 'twitter/user/follow'
                },
                unfollow: {
                    method: 'POST',
                    url: this.baseUrl + 'twitter/user/unfollow'
                }
            });
        }
        EndpointService.prototype.getAllUsers = function () {
            return this.$resource.getAllUsers().$promise;
        };

        EndpointService.prototype.createUser = function (user) {
            return this.$resource.createUser(user).$promise;
        };

        EndpointService.prototype.postMessage = function (post) {
            return this.$resource.postMessage(post).$promise;
        };

        EndpointService.prototype.getFeed = function (userId) {
            return this.$http.get(this.baseUrl + 'twitter/users/' + userId + '/feed');
        };

        EndpointService.prototype.getGlobalFeed = function () {
            return this.$resource.getGlobalFeed().$promise;
        };

        EndpointService.prototype.follow = function (follow) {
            return this.$resource.follow(follow).$promise;
        };

        EndpointService.prototype.unfollow = function (follow) {
            return this.$resource.unfollow(follow).$promise;
        };

        EndpointService.prototype.getFollowed = function (userId) {
            return this.$http.get(this.baseUrl + 'twitter/users/' + userId + '/followed');
        };
        EndpointService.$inject = ['$q', '$resource', '$http'];
        return EndpointService;
    })();
    App.EndpointService = EndpointService;

    angular.module('App').service('EndpointService', EndpointService);
})(App || (App = {}));
//# sourceMappingURL=endpointService.js.map
