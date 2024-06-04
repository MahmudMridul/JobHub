using System.ComponentModel.DataAnnotations;

namespace jobhub_api.Models
{
    public class Role
    {
        [Key]
        public int ID { get; set; }
        public required string Name { get; set; }
    }
}
