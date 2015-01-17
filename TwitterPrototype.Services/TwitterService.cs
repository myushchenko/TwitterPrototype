using System.Collections.Generic;
using System.Linq;
using TwitterPrototype.Data.Core;
using TwitterPrototype.Entities;

namespace TwitterPrototype.Services
{
    public class TwitterService : ITwitterService
    {
        private readonly IEntityRepository<User> _userRepository;
        private readonly IEntityRepository<Post> _postRepository;
        private readonly IEntityRepository<Follow> _followRepository;

        public TwitterService(IEntityRepository<User> userRepository, IEntityRepository<Post> postRepository, IEntityRepository<Follow> followRepository)
        {
            this._userRepository = userRepository;
            this._postRepository = postRepository;
            this._followRepository = followRepository;
        }

        public IList<User> GetAllUsers()
        {
            return this._userRepository.GetAll().ToList();
        }

        public void CreateUser(User user)
        {
            this._userRepository.Add(user);
            this._userRepository.Save();
        }

        public void PostMessage(Post post)
        {
            this._postRepository.Add(post);
            this._postRepository.Save();
        }
        public IList<Post> GetFeed(int userId)
        {
            return this._postRepository.FindBy(t => t.UserId == userId).ToList();
        }
        public IList<Post> GetGlobalFeed()
        {
            return this._postRepository.GetAll().ToList();
        }
        public IList<Follow> GetFollowed(int userId)
        {
            return this._followRepository.FindBy(t => t.FollowingUserId == userId).ToList();
        }
        public void Follow(Follow follow)
        {
            this._followRepository.Add(follow);
            this._followRepository.Save();
        }
        public void UnFollow(Follow follow)
        {
            this._followRepository.Delete(follow);
            this._followRepository.Save();
        }
    }
}
