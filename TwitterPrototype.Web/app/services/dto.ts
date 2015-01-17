/// <reference path="../../app/index.d.ts" />

module App {
    'use strict';

    export class UserDto {
        id: number;
        name: string;
    }

    export class PostDto {
        id: number;
        userId : number;
        message: string;
    }

    export class FollowDto {
        id: number;
        followingUserId: number;
        followedUserId: number;
    }

    export class Follow {
        id: number;
        userId: number;
        isFollowed: boolean;
        userName: string;
    }
}