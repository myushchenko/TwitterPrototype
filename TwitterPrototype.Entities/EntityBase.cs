using System;
namespace TwitterPrototype.Entities
{
    public class EntityBase : IEntity
    {
        public EntityBase()
        {
            this.CreatedAt = DateTime.UtcNow;
            this.UpdatedAt = DateTime.UtcNow;
        }

        public int Id { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
