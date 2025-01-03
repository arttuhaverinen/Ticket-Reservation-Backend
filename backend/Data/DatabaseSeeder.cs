﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;
using TicketReservationApp.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace TicketReservationApp.Data
{
    public class DatabaseSeeder
    {
        private readonly DataContext _context;

        public DatabaseSeeder(DataContext context)
        {
            _context = context;
        }

        public async Task Seed()
        {
            string roleId = Guid.NewGuid().ToString();
            string adminRoleName = "Admin";

            _context.Roles.Add(new IdentityRole
            {
                Id = roleId,
                Name = adminRoleName,
                NormalizedName = adminRoleName.ToUpper()
            });
            await _context.SaveChangesAsync();

            // Seed Users
            string userId = Guid.NewGuid().ToString();
            string userEmail = "admin@example.com";

            var hasher = new PasswordHasher<AppUser>();
            
            var user = new AppUser
            {
                Id = userId,
                UserName = userEmail,
                NormalizedUserName = userEmail.ToUpper(),
                Email = userEmail,
                NormalizedEmail = userEmail.ToUpper(),
                EmailConfirmed = true,
                PasswordHash = hasher.HashPassword(null, "Admin@123"),
                SecurityStamp = string.Empty,

            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            

            // Assign User to Role
            _context.UserRoles.Add(new IdentityUserRole<string>
            {
                RoleId = roleId,
                UserId = userId
            });

            await _context.SaveChangesAsync();

            _context.Timetables.AddRange(
            new Timetables
            {
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
            });
            await _context.SaveChangesAsync();

            _context.Posts.AddRange(
                new Posts
                {
                    PostContent = "seed 1",
                    PostTitle = "first post",
                    PostType = "info",
                    AppUserId = userId

                },
                new Posts
                {
                    PostContent = "seed 2",
                    PostTitle = "second post",
                    PostType = "warning",
                    AppUserId = userId

                },
                new Posts
                {
                    PostContent = "seed 3",
                    PostTitle = "third post",
                    PostType = "info",
                    AppUserId = userId

                });
            await _context.SaveChangesAsync();


            _context.Tickets.AddRange(
            new Tickets
            {
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
                Status = "paid"

            },
            new Tickets
            {
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

            await _context.SaveChangesAsync();

        }

    }
    }

