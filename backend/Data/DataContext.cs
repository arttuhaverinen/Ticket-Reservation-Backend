using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using System;
using TicketReservationApp.Models;
using Serilog;

namespace TicketReservationApp.Data


{
    public class DataContext : IdentityDbContext<AppUser>
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options) 
        {

        }

        public DbSet<Posts> Posts { get; set; }
        public DbSet<Tickets> Tickets { get; set; } 
        public DbSet<TicketReservationApp.Models.Timetables> Timetables { get; set; } = default!;

        
        // DATABASE SEEDING
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            /*
            // Seed Roles
            string roleId = Guid.NewGuid().ToString();
            string adminRoleName = "Admin";

            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
            {
                Id = roleId,
                Name = adminRoleName,
                NormalizedName = adminRoleName.ToUpper()
            });

            // Seed Users
            string userId = Guid.NewGuid().ToString();
            string userEmail = "admin@example.com";

            var hasher = new PasswordHasher<ApplicationUser>();
            modelBuilder.Entity<ApplicationUser>().HasData(new ApplicationUser
            {
                Id = userId,
                UserName = userEmail,
                NormalizedUserName = userEmail.ToUpper(),
                Email = userEmail,
                NormalizedEmail = userEmail.ToUpper(),
                EmailConfirmed = true,
                PasswordHash = hasher.HashPassword(null, "Admin@123"),
                SecurityStamp = string.Empty
            });

            // Assign User to Role
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            {
                RoleId = roleId,
                UserId = userId
            });
        
        modelBuilder.Entity<Timetables>().HasData(
                new Timetables
                {
                    Id = 1,
                    StartTime = new TimeSpan(9, 0, 0),
                    EndTime = new TimeSpan(9, 0, 0),
                    Price = 29.99,
                    Departure = "Joensuu",
                    Destination = "Tampere",
                    Day = new List<string> { "monday", "tuesday", "wednesday", "thursday", "friday" },
                    Cancelled = new List<DateTime>(),
                    Date = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc),
                    AppUserId = userId,

                },
                new Timetables
                {
                    Id = 2,
                    StartTime = new TimeSpan(9, 0, 0),
                    EndTime = new TimeSpan(9, 0, 0),
                    Price = 19.99,
                    Departure = "Joensuu",
                    Destination = "Kuopio",
                    Day = new List<string> { "saturday", "sunday" },
                    Cancelled = new List<DateTime>(),
                    Date = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc),
                    AppUserId = userId,


                },
                new Timetables
                {
                    Id = 3,
                    StartTime = new TimeSpan(17, 0, 0),
                    EndTime = new TimeSpan(17, 0, 0),
                    Price = 29.99,
                    Departure = "Joensuu",
                    Destination = "Kuopio",
                    Day = new List<string> { "saturday", "sunday" },
                    Cancelled = new List<DateTime>(),
                    Date = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc),
                    AppUserId = userId,



                },
                new Timetables
                {
                    Id = 4,
                    StartTime = new TimeSpan(9, 0, 0),
                    EndTime = new TimeSpan(9, 0, 0),
                    Price = 14.99,
                    Departure = "Joensuu",
                    Destination = "Nurmes",
                    Day = new List<string> { "monday", "tuesday", "wednesday", "thursday", "friday" },
                    Cancelled = new List<DateTime>(),
                    Date = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc),
                    AppUserId = userId,
                    PriceDiscount = 10.99
                }



            );;

            modelBuilder.Entity<Posts>().HasData(
                new Posts
                {
                    Id = 1,
                    PostContent = "seed 1",
                    PostTitle = "first post",
                    PostType = "info",
                    AppUserId = userId

                },
                new Posts
                {
                    Id = 2,
                    PostContent = "seed 2",
                    PostTitle = "second post",
                    PostType = "warning",
                    AppUserId = userId

                },
                new Posts
                {
                    Id = 3,
                    PostContent = "seed 3",
                    PostTitle = "third post",
                    PostType = "info",
                    AppUserId = userId

                });

            modelBuilder.Entity<Tickets>().HasData(
                new Tickets
                {
                    Id = 1,
                    AppUserId = userId,
                    Date = DateTime.SpecifyKind(new DateTime(2024, 9, 4, 9, 0, 0), DateTimeKind.Utc),
                    Departure = "Joensuu",
                    Destination = "Tampere",
                    StartTime = new TimeSpan(9, 0, 0),
                    Expired = false,
                    Seat = 12,
                    EndTime = new TimeSpan(9, 0, 0),
                    Name = "arttu",
                    TimetablesId = 1,
                    Status =  "paid"
                    
                },
                new Tickets
                {
                    Id = 2,
                    AppUserId = userId,
                    Date = DateTime.SpecifyKind(new DateTime(2024, 9, 4, 9, 0, 0), DateTimeKind.Utc),
                    Departure = "Joensuu",
                    Destination = "Tampere",
                    StartTime = new TimeSpan(9, 0, 0),
                    Expired = false,
                    Seat = 13,
                    EndTime = new TimeSpan(9, 0, 0),
                    Name = "juhani",
                    TimetablesId = 1,
                    Status = "paid"

                },
                new Tickets
                {
                    Id = 3,
                    AppUserId = userId,
                    Date = DateTime.SpecifyKind(new DateTime(2024, 9, 5, 9, 0, 0), DateTimeKind.Utc),
                    Departure = "Joensuu",
                    Destination = "Tampere",
                    StartTime = new TimeSpan(9, 0, 0),
                    Expired = false,
                    Seat = 5,
                    EndTime = new TimeSpan(9, 0, 0),
                    Name = "name",
                    TimetablesId = 1,
                    Status = "paid"

                },
                new Tickets
                {
                    Id = 4,
                    AppUserId = userId,
                    Date = DateTime.SpecifyKind(new DateTime(2024, 9, 8, 9, 0, 0), DateTimeKind.Utc),
                    Departure = "Joensuu",
                    Destination = "Kuopio",
                    StartTime = new TimeSpan(17, 0, 0),
                    Expired = false,
                    Seat = 10,
                    EndTime = new TimeSpan(17, 0, 0),
                    Name = "name",
                    TimetablesId = 2,
                    Status = "paid"

                },
                new Tickets
                {
                    Id = 5,
                    AppUserId = userId,
                    Date = DateTime.SpecifyKind(new DateTime(2024, 9, 7, 9, 0, 0), DateTimeKind.Utc),
                    Departure = "Joensuu",
                    Destination = "Kuopio",
                    StartTime = new TimeSpan(9, 0, 0),
                    Expired = false,
                    Seat = 9,
                    EndTime = new TimeSpan(9, 0, 0),
                    Name = "name",
                    TimetablesId = 2,
                    Status = "paid"

                },
                new Tickets
                {
                    Id = 6,
                    AppUserId = userId,
                    Date = DateTime.SpecifyKind(new DateTime(2024, 9, 7, 9, 0, 0), DateTimeKind.Utc),
                    Departure = "Joensuu",
                    Destination = "Kuopio",
                    StartTime = new TimeSpan(17, 0, 0),
                    Expired = false,
                    Seat = 12,
                    EndTime = new TimeSpan(17, 0, 0),
                    Name = "name",
                    TimetablesId = 3,
                    Status = "paid"
                }
                );
            */
        }
        

            
    }
            
}

