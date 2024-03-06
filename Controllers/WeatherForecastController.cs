using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Runtime.CompilerServices;
using System.Security.Claims;
namespace TicketReservationApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast"), Authorize(Roles = "Admin")]
        public IEnumerable<WeatherForecast> Get()
        {
            Console.WriteLine("Username: " + User.FindFirstValue(ClaimTypes.Name));
            Console.WriteLine("Role: " + User.FindFirstValue(ClaimTypes.Role));
            Console.WriteLine("First name: " + User.FindFirstValue("firstname"));
            Console.WriteLine("Last name: " + User.FindFirstValue("lastname"));

            var currentUser = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Console.WriteLine(currentUser);
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
