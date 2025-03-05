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
using Newtonsoft.Json;

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
        //[Authorize(Roles = "Admin")]
        [HttpGet("{email}")]
        public async Task<ActionResult> getUserByEmail(string email)
        {

            var user = await _usersRepository.GetUserByEmail(email);

            Console.WriteLine(user);


            return Ok(user);
        }

        //[Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult> insertUser([FromBody] AppUser appUser)
        {
            Console.WriteLine($"repository user: {JsonConvert.SerializeObject(appUser)}");

            var user = await _usersRepository.InsertUser(appUser);

            Console.WriteLine($"repository user: {JsonConvert.SerializeObject(user)}");


            return Ok(user);
        }



    }
}