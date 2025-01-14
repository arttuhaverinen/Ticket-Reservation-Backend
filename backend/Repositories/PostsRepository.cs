using Microsoft.Extensions.Hosting;
using System.Security.Claims;
using TicketReservationApp.Data;
using TicketReservationApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TicketReservationApp.Dto;
using Microsoft.AspNetCore.Mvc;

namespace TicketReservationApp.Repositories
{
    public class PostsRepository : IPostsRepository
    {
        private readonly DataContext _dataContext;
        public PostsRepository(DataContext dataContext) 
        {
            _dataContext = dataContext;
        }

        public async Task<Posts> AddPost (Posts post)
        {
            
            await _dataContext.Posts.AddAsync(post);
            await _dataContext.SaveChangesAsync();
            return post;
        }

        public async Task<Posts?> DeletePost(int postId)
        {
            var post = await _dataContext.Posts.FindAsync(postId);
            if (post == null) 
            {
                return null;
            }
            _dataContext.Posts.Remove(post);
            await _dataContext.SaveChangesAsync();
            return post;
        }


        public async Task<Posts?> GetPostByID(int studentId)
        {
            var post = await _dataContext.Posts.FirstOrDefaultAsync(post => post.Id == studentId);
            return post;

        }

        public async Task<IEnumerable<Posts>> GetPosts()
        {
            return await _dataContext.Posts.ToListAsync();
        }



        public async Task<Posts> InsertPost(Posts post)
        {
            await _dataContext.Posts.AddAsync(post);
            await _dataContext.SaveChangesAsync();
            return post;
        }

        public async Task<Posts> UpdatePost(int id, Posts post)
        {
            /*
            var postById = await _dataContext.Posts.FindAsync(id);
            if (postById == null)
            {
                return null;
            }*/

            _dataContext.Posts.Update(post);
            await _dataContext.SaveChangesAsync();
            return post;
            
        }


    }
}
