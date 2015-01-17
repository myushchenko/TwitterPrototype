using System.Collections.Generic;
using TwitterPrototype.Entities;

namespace TwitterPrototype.Services
{
    public interface ITwitterService
    {
        IList<User> GetAllUsers();
        void CreateUser(User user);
        void PostMessage(Post post);
        IList<Post> GetFeed(int userId);
        IList<Post> GetGlobalFeed();
        IList<Follow> GetFollowed(int userId);
        void Follow(Follow follow);
        void UnFollow(Follow follow);
    }
}
