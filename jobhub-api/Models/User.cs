

namespace jobhub_api.Models
{
    public class User
    {
        public required int ID { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        //Relation with Role
        public required Role Role { get; set; }
    }
}
