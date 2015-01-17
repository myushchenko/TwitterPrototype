namespace TwitterPrototype.Entities
{
    public class Follow : EntityBase
    {
       public int FollowingUserId { get; set; }
       public int FollowedUserId { get; set; }
    }
}
