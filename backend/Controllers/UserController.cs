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
        [AllowAnonymous]
        public async Task<ActionResult<PostsDto>> getPosts()
        {
            string authorizationHeader = Request.Headers["Authorization"];
            var id = User.Identity.IsAuthenticated;

            var posts = await _usersRepository.GetUsers();



            return Ok();
        }



    }
}