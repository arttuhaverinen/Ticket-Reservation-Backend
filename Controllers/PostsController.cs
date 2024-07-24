using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TicketReservationApp.Models;
using TicketReservationApp.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using TicketReservationApp.Dto;

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
        public async Task<ActionResult<PostsDto>> getPosts()
        {
            System.Diagnostics.Debug.WriteLine("get");

            var posts = await _postsRepository.GetPosts();

            var postsDto = posts.Select(p => new PostsDto
            {
                AppUserId = p.AppUserId,
                PostContent = p.PostContent,
                PostTitle = p.PostTitle,
                PostType = p.PostType,
            });


            return Ok(postsDto);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<PostsDto>> addPosts([FromBody] PostsDto post)
        {

            System.Diagnostics.Debug.WriteLine(post.PostType);
            post.AppUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            System.Diagnostics.Debug.WriteLine("User Id: " + User.FindFirstValue(ClaimTypes.NameIdentifier));
            System.Diagnostics.Debug.WriteLine("User Id: " + User.FindFirstValue(ClaimTypes.NameIdentifier));
            System.Diagnostics.Debug.WriteLine("User Id: " + User.FindFirstValue(ClaimTypes.NameIdentifier));

            Posts addpost = new Posts()
            {
                PostType = post.PostType,
                PostContent = post.PostContent,
                PostTitle = post.PostTitle,
                AppUserId = post.AppUserId
            };

            var newPost = await _postsRepository.InsertPost(addpost);

            return post;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _postsRepository.DeletePost(id);

            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id, [FromBody]PostsDto post)
        {
            Posts modifiedPost = new Posts()
            {
                Id = id,
                PostType = post.PostType,
                PostContent = post.PostContent,
                PostTitle = post.PostTitle,
                AppUserId = User.FindFirstValue(ClaimTypes.NameIdentifier)
            };

            System.Diagnostics.Debug.WriteLine(modifiedPost.ToString());


            var updatedPost = await _postsRepository.UpdatePost(id, modifiedPost);

            if (updatedPost == null)
            {
                return NotFound();
            }

            return Ok(updatedPost);
        }


    }

}
