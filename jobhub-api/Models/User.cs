using System.ComponentModel.DataAnnotations;

namespace jobhub_api.Models
{
    public class User
    {
        [Key]
        public int ID { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public required byte[] Salt { get; set; }
        //Relation with Role
        public required Role Role { get; set; }
    }
}
