using Microsoft.EntityFrameworkCore;
using TicketReservationApp.Data;
using TicketReservationApp.Models;
using TicketReservationApp.Repositories;
using Xunit;
using Serilog;
using Xunit.Abstractions;
using Microsoft.VisualStudio.TestPlatform.Utilities;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using TicketReservationApp.Controllers;
using TicketReservationApp.Dto;
using System;
using System.Diagnostics.CodeAnalysis;
using System.Security.Claims;

namespace TicketReservationApp.Tests
{
    public class TimetableTest : IAsyncLifetime
    {
        private readonly DbContextOptions<DataContext> _options;

        private readonly ITestOutputHelper _output;

        public TimetableTest(ITestOutputHelper output)
        {

        
            _options = new DbContextOptionsBuilder<DataContext>().UseInMemoryDatabase(databaseName: "TestDatabase")
            .UseLoggerFactory(new LoggerFactory().AddSerilog(new LoggerConfiguration().WriteTo.Console().CreateLogger()))
            .Options;








        _output = output;

        }

        private DataContext GetDbContext()
        {
            return new DataContext(_options);

        }



        public async Task InitializeAsync()
        {
            // Apply seed data
            using var context = new DataContext(_options);
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            var seeder = new DatabaseSeeder(context);
            await seeder.Seed();
            _output.WriteLine("Database seeded for testing.");

        }

        public Task DisposeAsync()
        {
            // Perform any clean-up logic if needed
            return Task.CompletedTask;
        }



        [Fact]
        public async Task GetAllTimetables()
        {
            using var context = GetDbContext();
            var repository = new TimetableRepository(context);
            var controller = new TimetablesController(repository);

            var result = await controller.GetTimetables(null);

            _output.WriteLine($"GetAllTimetables - {JsonConvert.SerializeObject(result)}");

            var actionResult = Assert.IsType<ActionResult<IEnumerable<TimetableDto>>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnValue = Assert.IsType<List<TimetableResponseDto>>(okResult.Value);

            Assert.NotNull(returnValue);
            Assert.NotEmpty(returnValue); 

        }

        [Fact]
        public async Task GetTimetableById()
        {
            using var context = GetDbContext();
            var repository = new TimetableRepository(context);
            var controller = new TimetablesController(repository);

            var result = await controller.GetTimetablesById(1);

            _output.WriteLine($"GetTimetableById - {JsonConvert.SerializeObject(result)}");

            var actionResult = Assert.IsType<ActionResult<TimetableDto>>(result);
            _output.WriteLine($"GetTimetableById - {JsonConvert.SerializeObject(actionResult)}");

            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnValue = Assert.IsType<TimetableResponseDto>(okResult.Value);

            Assert.NotNull(returnValue);

        }

        [Fact]
        public async Task GetTimetableByIdThatDoesNotExist()
        {
            using var context = GetDbContext();
            var repository = new TimetableRepository(context);
            var controller = new TimetablesController(repository);

            var result = await controller.GetTimetablesById(9999);

            _output.WriteLine($"GetTimetableByIdThatDoesNotExist - {JsonConvert.SerializeObject(result)}");

            var notFoundResult = Assert.IsType<NotFoundResult>(result.Result);

            Assert.Equal(404, notFoundResult.StatusCode);

        }

        [Fact]
        public async Task PostTimetable()
        {
            using var context = GetDbContext();
            var repository = new TimetableRepository(context);
            var controller = new TimetablesController(repository);

            var claims = new[]
{
            new Claim(ClaimTypes.NameIdentifier, "admin")
            };

            var identity = new ClaimsIdentity(claims, "TestAuthentication");
            var user = new ClaimsPrincipal(identity);

            controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = user
                }
            };


            TimetableDto tb = new TimetableDto()
            {
                StartTime = new TimeSpan(9, 0, 0),
                EndTime = new TimeSpan(9, 0, 0),
                Price = 0,
                Departure = "string",
                Destination = "string",
                Day = new List<string> { "monday" },
                Date = new DateTime(),
                PriceDiscount = 0,
               
                
                
            };



        var result = await controller.PostTimetables(tb);

            _output.WriteLine($"PostTimetable - {JsonConvert.SerializeObject(result)}");

            var actionResult = Assert.IsType<ActionResult<TimetableDto>>(result);

            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnValue = Assert.IsType<Timetables>(okResult.Value);

            Assert.NotNull(returnValue);

        }

        [Fact]
        public async Task DeleteTimetable()
        {
            using var context = GetDbContext();
            var repository = new TimetableRepository(context);
            var controller = new TimetablesController(repository);

            var result = await controller.DeleteTimetables(1);

            _output.WriteLine($"DeleteTimetable - {JsonConvert.SerializeObject(result)}");

            var actionResult = Assert.IsType<ActionResult<TimetableDto>>(result);

            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnValue = Assert.IsType<TimetableDto>(okResult.Value);

            Assert.NotNull(returnValue);

        }





    }
}

// dotnet test --logger "console;verbosity=detailed"
