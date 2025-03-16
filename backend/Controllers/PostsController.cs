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
using TicketReservationApp.Caching;

namespace TicketReservationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IPostsRepository _postsRepository;
        private readonly IRedisCacheService _cache;
        public PostsController(IPostsRepository postsRepository, IRedisCacheService cache)
        {
            _postsRepository = postsRepository;
            _cache = cache;

        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<PostsDto>> getPosts()
        {
            //string authorizationHeader = Request.Headers["Authorization"];
            //var id = User.Identity.IsAuthenticated;

            var cachedPosts = _cache.GetData<IEnumerable<Posts>>("posts_cache");

            if (cachedPosts != null) {
                Console.WriteLine("posts cache hit");
                var cachedPostsDto = cachedPosts.Select(p => new PostsDto
                {
                    AppUserId = p.AppUserId,
                    PostContent = p.PostContent,
                    PostTitle = p.PostTitle,
                    PostType = p.PostType,
                });

                return Ok(cachedPostsDto);
            }

            var posts = await _postsRepository.GetPosts();

            var postsDto = posts.Select(p => new PostsDto
            {
                AppUserId = p.AppUserId,
                PostContent = p.PostContent,
                PostTitle = p.PostTitle,
                PostType = p.PostType,
            });

            _cache.setData("posts_cache", posts);

            return Ok(postsDto);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<PostsDto>> addPosts([FromBody] PostsDto post)
        {

            //post.AppUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var username = User.FindFirstValue(ClaimTypes.NameIdentifier);

            Posts addpost = new Posts()
            {
                PostType = post.PostType,
                PostContent = post.PostContent,
                PostTitle = post.PostTitle,
                AppUserId = username
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
