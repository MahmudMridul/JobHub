namespace jobhub_api.Models.DTOs
{
    public class UserRegistrationDTO
    {
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        //Relation with Role
        public required string RoleName { get; set; }
    }
}
