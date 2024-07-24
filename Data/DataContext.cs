using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using System;
using TicketReservationApp.Models;
using Serilog;

namespace TicketReservationApp.Data


{
    public class ApplicationUser : IdentityUser { }
    public class DataContext : IdentityDbContext<IdentityUser>
    {
        /*
        private static readonly ILoggerFactory loggerFactory = LoggerFactory.Create(builder =>
        {
            builder.AddSerilog(new LoggerConfiguration().WriteTo.Console().CreateLogger());
        });
        */
        public DataContext(DbContextOptions<DataContext> options) : base(options) 
        {

        }

        /*
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseLoggerFactory(loggerFactory);
            }
        }
        */
        public DbSet<Posts> Posts { get; set; }
        public DbSet<Tickets> Tickets { get; set; } 
        public DbSet<TicketReservationApp.Models.Timetables> Timetables { get; set; } = default!;
        //public DbSet<AppUser> User { get; set; }

        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


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
                    StartTime = DateTime.SpecifyKind(new DateTime(2024, 7, 19, 9, 0, 0), DateTimeKind.Utc),
                    EndTime = DateTime.SpecifyKind(new DateTime(2024, 7, 19, 9, 0, 0), DateTimeKind.Utc),
                    Price = 29.99,
                    Departure = "Joensuu",
                    Destination = "Tampere",
                    Day = "Maanantai"
                },
                new Timetables
                {
                    Id = 2,
                    StartTime = DateTime.SpecifyKind(new DateTime(2024, 7, 19, 9, 0, 0), DateTimeKind.Utc),
                    EndTime = DateTime.SpecifyKind(new DateTime(2024, 7, 19, 9, 0, 0), DateTimeKind.Utc),
                    Price = 19.99,
                    Departure = "Joensuu",
                    Destination = "Kuopio",
                    Day = "Tiistai"
                },
                new Timetables
                {
                    Id = 3,
                    StartTime = DateTime.SpecifyKind(new DateTime(2024, 7, 19, 9, 0, 0), DateTimeKind.Utc),
                    EndTime = DateTime.SpecifyKind(new DateTime(2024, 7, 19, 9, 0, 0), DateTimeKind.Utc),
                    Price = 14.99,
                    Departure = "Joensuu",
                    Destination = "Nurmes",
                    Day = "Keskiviikko"
                }



            );

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
                    Date = DateTime.SpecifyKind(new DateTime(2024, 7, 19, 9, 0, 0), DateTimeKind.Utc),
                    Departure = "Joensuu",
                    Destination = "Tampere",
                    StartTime = DateTime.SpecifyKind(new DateTime(2024, 7, 19, 9, 0, 0), DateTimeKind.Utc),
                    Expired = false,
                    Seat = 12,
                    EndTime = DateTime.SpecifyKind(new DateTime(2024, 7, 19, 9, 0, 0), DateTimeKind.Utc),
                    Name = "arttu",
                    TimetablesId = 1,
                    
                },
                new Tickets
                {
                    Id = 2,
                    AppUserId = userId,
                    Date = DateTime.SpecifyKind(new DateTime(2024, 7, 19, 9, 0, 0), DateTimeKind.Utc),
                    Departure = "Joensuu",
                    Destination = "Tampere",
                    StartTime = DateTime.SpecifyKind(new DateTime(2024, 7, 19, 9, 0, 0), DateTimeKind.Utc),
                    Expired = false,
                    Seat = 13,
                    EndTime = DateTime.SpecifyKind(new DateTime(2024, 7, 19, 9, 0, 0), DateTimeKind.Utc),
                    Name = "juhani",
                    TimetablesId = 1,
                },
                new Tickets
                {
                    Id = 3,
                    AppUserId = userId,
                    Date = DateTime.SpecifyKind(new DateTime(2024, 7, 19, 9, 0, 0), DateTimeKind.Utc),
                    Departure = "Joensuu",
                    Destination = "Kuopio",
                    StartTime = DateTime.SpecifyKind(new DateTime(2024, 7, 19, 9, 0, 0), DateTimeKind.Utc),
                    Expired = false,
                    Seat = 5,
                    EndTime = DateTime.SpecifyKind(new DateTime(2024, 7, 19, 9, 0, 0), DateTimeKind.Utc),
                    Name = "name",
                    TimetablesId = 2,
                });
        }
        


    }
}

