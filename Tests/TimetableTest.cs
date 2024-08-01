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

namespace TicketReservationApp.Tests
{
    public class TimetableTest
    {
        private readonly DbContextOptions<DataContext> _options;

        private readonly ITestOutputHelper _output;

        public TimetableTest(ITestOutputHelper output)
        {
            _options = new DbContextOptionsBuilder<DataContext>().UseInMemoryDatabase(databaseName: "TestDatabase")
            .UseLoggerFactory(new LoggerFactory().AddSerilog(new LoggerConfiguration().WriteTo.Console().CreateLogger()))
            .Options;

            // Apply seed data
            using var context = new DataContext(_options);
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            _output = output;

        }

        private DataContext GetDbContext()
        {
            return new DataContext(_options);

        }





        [Fact]
        public async Task GetAllTimetables()
        {
            using var context = GetDbContext();
            var repository = new TimetableRepository(context);
            var controller = new TimetablesController(repository);

            var result = await controller.GetTimetables();

            _output.WriteLine($"GetAllTimetables - {JsonConvert.SerializeObject(result)}");

            var actionResult = Assert.IsType<ActionResult<IEnumerable<TimetableDto>>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnValue = Assert.IsType<List<TimetableDto>>(okResult.Value);

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
            var returnValue = Assert.IsType<TimetableDto>(okResult.Value);

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

            Timetables tb = new Timetables()
            {
                StartTime = DateTime.SpecifyKind(new DateTime(2024, 7, 19, 9, 0, 0), DateTimeKind.Utc),
                EndTime = DateTime.SpecifyKind(new DateTime(2024, 7, 19, 9, 0, 0), DateTimeKind.Utc),
                Price = 0,
                Departure = "string",
                Destination = "string",
                Day = "string"
            };
            

            var result = await controller.PostTimetables(tb);

            _output.WriteLine($"PostTimetable - {JsonConvert.SerializeObject(result)}");

            var actionResult = Assert.IsType<ActionResult<TimetableDto>>(result);

            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnValue = Assert.IsType<TimetableDto>(okResult.Value);

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
