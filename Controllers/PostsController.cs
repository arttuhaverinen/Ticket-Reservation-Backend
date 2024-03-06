using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TicketReservationApp.Models;
using TicketReservationApp.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace TicketReservationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IPostsRepository _postsRepository;
        public PostsController(IPostsRepository postsRepository)
        {
            _postsRepository = postsRepository;
        }

        [HttpGet]
        public List<Posts> getPosts()
        {
            return _postsRepository.GetPosts();
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public Posts addPosts([FromBody] Posts post)
        {
            Console.WriteLine(post.PostType);
            post.AppUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Console.WriteLine("User Id: " + User.FindFirstValue(ClaimTypes.NameIdentifier));
            Console.WriteLine("User Id: " + User.FindFirstValue(ClaimTypes.NameIdentifier));
            Posts addPost = _postsRepository.InsertPost(post);
            return addPost;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var timetables = _postsRepository.GetPostByID(id);

            if (timetables == null)
            {
                return NotFound();
            }

            _postsRepository.DeletePost(id);


            return NoContent();
        }



    }

}
