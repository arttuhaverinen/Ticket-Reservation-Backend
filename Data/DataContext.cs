using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TicketReservationApp.Models;

namespace TicketReservationApp.Data
{
    public class DataContext : IdentityDbContext<IdentityUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) 
        {


            
                
            

        }
        public DbSet<Posts> Posts { get; set; }
        public DbSet<Tickets> Tickets { get; set; } 
        public DbSet<TicketReservationApp.Models.Timetables> Timetables { get; set; } = default!;
        //public DbSet<AppUser> User { get; set; }

    }
}

