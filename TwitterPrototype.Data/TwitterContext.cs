using System.Data.Entity;
using TwitterPrototype.Data.Core;
using TwitterPrototype.Entities;

namespace TwitterPrototype.Data
{
    public class TwitterContext : EntitiesContextBase
    {
        static TwitterContext()
        {
            Database.SetInitializer<TwitterContext>(null);
        }
        public TwitterContext()
            : base("Name=TwitterContext")
        {
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Follow> Follows { get; set; }
        
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
