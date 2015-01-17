using System.Collections.Generic;
using System.Web.Http;
using TwitterPrototype.Entities;
using TwitterPrototype.Services;

namespace TwitterPrototype.Web.Controllers
{
    [RoutePrefix("api/twitter")]
    public class TwitterController : ApiController
    {
        private readonly ITwitterService _twitterService;

        public TwitterController(ITwitterService twitterService)
        {
            this._twitterService = twitterService;
        }

        [HttpGet, Route("users")]
        public IList<User> GetAllUsers()
        {
            return this._twitterService.GetAllUsers();
        }

        [HttpPost, Route("user/create")]
        public void CreateUser(User user)
        {
            this._twitterService.CreateUser(user);
        }

        [HttpPost, Route("user/post")]
        public void PostMessage(Post post)
        {
            this._twitterService.PostMessage(post);
        }

        [HttpGet, Route("users/{id:int}/feed")]
        public IList<Post> GetFeed(int id)
        {
            return this._twitterService.GetFeed(id);
        }

        [HttpGet, Route("users/feed")]
        public IList<Post> GetGlobalFeed()
        {
            return this._twitterService.GetGlobalFeed();
        }

        [HttpPost, Route("user/follow")]
        public void Follow(Follow follow)
        {
            this._twitterService.Follow(follow);
        }

        [HttpPost, Route("user/unfollow")]
        public void UnFollow(Follow follow)
        {
            this._twitterService.UnFollow(follow);
        }

        [HttpGet, Route("users/{id:int}/followed")]
        public IList<Follow> GetFollowed(int id)
        {
            return this._twitterService.GetFollowed(id);
        }
    }
}
