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
using System.Security.Claims;
using System.Security.Principal;

namespace TicketReservationApp.Tests
{
    public class TicketsTest
    {
        private readonly DbContextOptions<DataContext> _options;

        private readonly ITestOutputHelper _output;

        public TicketsTest(ITestOutputHelper output)
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
        public async Task GetAllTickets()
        {
            using var context = GetDbContext();
            var repository = new TicketRepository(context);
            var controller = new TicketsController(repository);

            var result = await controller.GetTickets();

            _output.WriteLine($"GetAllTickets - {JsonConvert.SerializeObject(result)}");

            var actionResult = Assert.IsType<ActionResult<IEnumerable<TicketDto>>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnValue = Assert.IsType<List<TicketDto>>(okResult.Value);

            Assert.NotNull(returnValue);
            Assert.NotEmpty(returnValue);

        }

        [Fact]
        public async Task GetTicketById()
        {
            using var context = GetDbContext();
            var repository = new TicketRepository(context);
            var controller = new TicketsController(repository);

            var result = await controller.GetTicketsById(1);

            _output.WriteLine($"GetTicketsById - {JsonConvert.SerializeObject(result)}");

            var actionResult = Assert.IsType<ActionResult<TicketDto>>(result);
            _output.WriteLine($"GetTicketById - {JsonConvert.SerializeObject(actionResult)}");

            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnValue = Assert.IsType<TicketDto>(okResult.Value);

            Assert.NotNull(returnValue);

        }

        [Fact]
        public async Task GetTicketByIdThatDoesNotExist()
        {
            using var context = GetDbContext();
            var repository = new TicketRepository(context);
            var controller = new TicketsController(repository);

            var result = await controller.GetTicketsById(9999);

            _output.WriteLine($"GetTicketByIdThatDoesNotExist - {JsonConvert.SerializeObject(result)}");

            var notFoundResult = Assert.IsType<NotFoundResult>(result.Result);

            Assert.Equal(404, notFoundResult.StatusCode);

        }

        [Fact]
        public async Task PostTicket()
        {
            using var context = GetDbContext();
            var repository = new TicketRepository(context);
            var _controller = new TicketsController(repository);

            var claims = new[]
{
            new Claim(ClaimTypes.NameIdentifier, "admin")
            };

            var identity = new ClaimsIdentity(claims, "TestAuthentication");
            var user = new ClaimsPrincipal(identity);

            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = user
                }
            };


            var ticketDto = new TicketDto()
            {
                StartTime = DateTime.SpecifyKind(new DateTime(2024, 7, 19, 9, 0, 0), DateTimeKind.Utc),
                EndTime = DateTime.SpecifyKind(new DateTime(2024, 7, 19, 9, 0, 0), DateTimeKind.Utc),
                Departure = "string",
                Destination = "string",
                //AppUserId = "1",
                Name = "string",
                TimetablesId = 1,
                Expired = false,
                Seat = 10,
                
            };


            var result = await _controller.PostTickets(ticketDto);

            _output.WriteLine($"PostTicket - {JsonConvert.SerializeObject(result)}");

            var actionResult = Assert.IsType<ActionResult<TicketDto>>(result);

            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnValue = Assert.IsType<TicketDto>(okResult.Value);

            Assert.NotNull(returnValue);

        }

        [Fact]
        public async Task DeleteTicket()
        {
            using var context = GetDbContext();
            var repository = new TicketRepository(context);
            var controller = new TicketsController(repository);

            var result = await controller.DeleteTickets(1);

            _output.WriteLine($"DeleteTicket - {JsonConvert.SerializeObject(result)}");

            var actionResult = Assert.IsType<ActionResult<TicketDto>>(result);

            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnValue = Assert.IsType<TicketDto>(okResult.Value);

            Assert.NotNull(returnValue);

        }





    }
}