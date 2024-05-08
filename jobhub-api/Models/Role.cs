

namespace jobhub_api.Models
{
    public class Role
    {
        public required int ID { get; set; }
        public required string Name { get; set; }
        //Relation with User
        public required int UserID { get; set; }
        public required User User { get; set; }
    }
}
