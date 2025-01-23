using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;
using TicketReservationApp.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace TicketReservationApp.Data
{
    public class DatabaseSeederTest
    {
        private readonly DataContext _context;

        public DatabaseSeederTest(DataContext context)
        {
            _context = context;
        }

        public async Task Seed()
        {

            var SEED_ADMIN_USERNAME = "test-admin-user@example.com";
            var SEED_ADMIN_PASSWORD = "test-admin-password";
            var SEED_USER_USERNAME = "test-user-user@example.com";
            var SEED_USER_PASSWORD = "test-user-password";
            var SEED_TEST_ADMIN_USERNAME = "test-admin2-password@example.com";
            var SEED_TEST_ADMIN_PASSWORD = "test-admin2-password";



            string roleId = Guid.NewGuid().ToString();
            string adminRoleName = "Admin";

            _context.Roles.Add(new IdentityRole
            {
                Id = roleId,
                Name = adminRoleName,
                NormalizedName = adminRoleName.ToUpper()
            });
            await _context.SaveChangesAsync();

            // Seed ADMIN
            string userId = Guid.NewGuid().ToString();
            string userEmail = SEED_ADMIN_USERNAME;

            var hasher = new PasswordHasher<AppUser>();

            var user = new AppUser
            {
                Id = userId,
                UserName = userEmail,
                NormalizedUserName = userEmail.ToUpper(),
                Email = userEmail,
                NormalizedEmail = userEmail.ToUpper(),
                EmailConfirmed = true,
                SecurityStamp = string.Empty,

            };
            user.PasswordHash = hasher.HashPassword(user, SEED_ADMIN_PASSWORD);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();


            // Assign User to Role
            _context.UserRoles.Add(new IdentityUserRole<string>
            {
                RoleId = roleId,
                UserId = userId
            });

            // Seed TEST ADMIN
            string testAdminUserId = Guid.NewGuid().ToString();
            string testAdminuserEmail = SEED_TEST_ADMIN_USERNAME;


            var testAdmin = new AppUser
            {
                Id = testAdminUserId,
                UserName = testAdminuserEmail,
                NormalizedUserName = testAdminuserEmail.ToUpper(),
                Email = testAdminuserEmail,
                NormalizedEmail = testAdminuserEmail.ToUpper(),
                EmailConfirmed = true,
                SecurityStamp = string.Empty,

            };
            testAdmin.PasswordHash = hasher.HashPassword(testAdmin, SEED_TEST_ADMIN_PASSWORD);
            _context.Users.Add(testAdmin);
            await _context.SaveChangesAsync();


            // Assign User to Role
            _context.UserRoles.Add(new IdentityUserRole<string>
            {
                RoleId = roleId,
                UserId = testAdminUserId
            });

            // Seed TEST USER
            string testUserUserId = Guid.NewGuid().ToString();
            string testUseruserEmail = SEED_USER_USERNAME;


            var testUser = new AppUser
            {
                Id = testUserUserId,
                UserName = testUseruserEmail,
                NormalizedUserName = testUseruserEmail.ToUpper(),
                Email = testUseruserEmail,
                NormalizedEmail = testUseruserEmail.ToUpper(),
                EmailConfirmed = true,
                SecurityStamp = string.Empty,

            };
            testUser.PasswordHash = hasher.HashPassword(testUser, SEED_USER_PASSWORD);
            _context.Users.Add(testUser);
            await _context.SaveChangesAsync();


            // Assign User to Role


            await _context.SaveChangesAsync();

            _context.Timetables.AddRange(
            new Timetables
            {
                StartTime = new TimeSpan(9, 0, 0),
                EndTime = new TimeSpan(12, 0, 0),
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
                StartTime = new TimeSpan(16, 0, 0),
                EndTime = new TimeSpan(19, 0, 0),
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
                EndTime = new TimeSpan(20, 0, 0),
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
                EndTime = new TimeSpan(12, 0, 0),
                Price = 14.99,
                Departure = "Joensuu",
                Destination = "Nurmes",
                Day = new List<string> { "monday", "tuesday", "wednesday", "thursday", "friday" },
                Cancelled = new List<DateTime>(),
                Date = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc),
                AppUserId = userId,
                PriceDiscount = 10.99
            },
            new Timetables
            {
                StartTime = new TimeSpan(18, 0, 0),
                EndTime = new TimeSpan(21, 0, 0),
                Price = 14.99,
                Departure = "Joensuu",
                Destination = "Kuopio",
                Day = new List<string> { "monday", "tuesday", "wednesday", "thursday", "friday, saturday, sunday" },
                Cancelled = new List<DateTime>(),
                Date = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc),
                AppUserId = userId,
                PriceDiscount = 10.99
            },
            new Timetables
            {
                StartTime = new TimeSpan(15, 0, 0),
                EndTime = new TimeSpan(18, 0, 0),
                Price = 14.99,
                Departure = "Kuopio",
                Destination = "Tampere",
                Day = new List<string> { "monday", "tuesday", "wednesday", "thursday", "friday, saturday, sunday" },
                Cancelled = new List<DateTime>(),
                Date = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc),
                AppUserId = userId,
                PriceDiscount = 10.99
            },
            new Timetables
            {
                StartTime = new TimeSpan(9, 0, 0),
                EndTime = new TimeSpan(12, 0, 0),
                Price = 20.99,
                Departure = "Joensuu",
                Destination = "Tampere",
                Day = new List<string> { "saturday", "sunday" },
                Cancelled = new List<DateTime>(),
                Date = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc),
                AppUserId = userId,
                PriceDiscount = 15.99
            });
            await _context.SaveChangesAsync();

            _context.Posts.AddRange(
                new Posts
                {
                    PostContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc neque lacus, facilisis ac est in, hendrerit ultricies lacus. Pellentesque eget elit faucibus, consequat ligula vel, aliquet ex. Mauris sed vehicula augue. In rhoncus leo malesuada felis tincidunt egestas. Nullam et sollicitudin libero. Curabitur suscipit, augue quis finibus porta, sem nulla luctus felis, nec imperdiet dui enim vitae sapien. Sed ex odio, ullamcorper nec ante vel, vehicula mollis quam. Duis et massa felis.",
                    PostTitle = "Lisäämme vuoroja Kuopion ja Tampereen välille",
                    PostType = "normal",
                    AppUserId = userId

                },
                new Posts
                {
                    PostContent = "Morbi sit amet mollis ipsum. Integer sed neque risus. Aliquam bibendum ex at scelerisque maximus. Vivamus eu ex ut magna efficitur ullamcorper. Curabitur pulvinar magna augue, sit amet suscipit magna consectetur sollicitudin. Suspendisse id neque orci. Fusce elementum purus vitae odio viverra pharetra. Phasellus sit amet laoreet eros.",
                    PostTitle = "Onnettomuus Joensuun ja Kuopion välillä",
                    PostType = "warning",
                    AppUserId = userId

                },
                new Posts
                {
                    PostContent = "Sed at eleifend ex, at ullamcorper velit. Vivamus viverra enim vel ornare lacinia. Nulla leo elit, congue et viverra vel, cursus vel purus. Phasellus eget ante a est mollis rhoncus id eu metus. Mauris sit amet metus augue. Pellentesque tincidunt dictum auctor. Fusce id faucibus lacus. Mauris lorem odio, suscipit vel sollicitudin in, pretium nec lorem.",
                    PostTitle = "Tavoitteemme vuodelle 2025.",
                    PostType = "normal",
                    AppUserId = userId

                },
                new Posts
                {
                    PostContent = "Aenean sed leo ultricies, semper sem non, cursus nibh. In hac habitasse platea dictumst. In nec magna porttitor, vehicula nibh a, pellentesque nulla. Integer ex nunc, facilisis sit amet dolor porta, cursus facilisis lorem.",
                    PostTitle = "Aikataulumuutoksia Joensuun ja Kuopion välille",
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
                Name = "haverinen",
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
                Name = "asiakas asiakasnen",
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
                Name = "aku ankka",
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
                Name = "mikki hiiri",
                TimetablesId = 3,
                Status = "paid"
            }
            );

            await _context.SaveChangesAsync();

        }

    }
}

