using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TicketReservationApp.Models;
using TicketReservationApp.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using TicketReservationApp.Dto;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace TicketReservationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _usersRepository;
        public UserController(IUserRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        [HttpGet]
        public async Task<ActionResult> getUserById()
        {
            var userId = User?.Identity?.IsAuthenticated == true
            ? User.FindFirstValue(ClaimTypes.NameIdentifier)
            : null;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            Console.WriteLine(userId);

            var user = await _usersRepository.GetUserByID(userId);

            Console.WriteLine(user);


            return Ok(user);
        }



    }
}