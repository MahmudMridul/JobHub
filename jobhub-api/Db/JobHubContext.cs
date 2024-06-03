using jobhub_api.Models;
using Microsoft.EntityFrameworkCore;

namespace jobhub_api.Db
{
    public class JobHubContext : DbContext
    {
        public JobHubContext(DbContextOptions<JobHubContext> options) : base(options)
        {
            
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
    }
}
