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
    }
}

// dotnet test --logger "console;verbosity=detailed"
