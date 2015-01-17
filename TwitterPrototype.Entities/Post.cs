using System.ComponentModel.DataAnnotations;

namespace TwitterPrototype.Entities
{
    public class Post : EntityBase
    {
        public int UserId { get; set; }

        [StringLength(140, ErrorMessage = "Maximum {2} characters exceeded")]
        public string Message { get; set; }
    }
}
