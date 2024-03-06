using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json;

namespace TicketReservationApp.Controllers
{
    [Route("api/")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        [Authorize(Roles = "Admin")]
        [HttpGet("role")]
        public string getRole ()
        {
            Console.WriteLine("Username: " + User.FindFirstValue(ClaimTypes.Name));
            Console.WriteLine("Role: " + User.FindFirstValue(ClaimTypes.Role));
            Console.WriteLine("First name: " + User.FindFirstValue("firstname"));
            Console.WriteLine("Last name: " + User.FindFirstValue("lastname"));
            string role = User.FindFirstValue(ClaimTypes.Role);
            return JsonSerializer.Serialize(role);
        }

    }
}
