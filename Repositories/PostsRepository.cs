using Microsoft.Extensions.Hosting;
using System.Security.Claims;
using TicketReservationApp.Data;
using TicketReservationApp.Models;
using Microsoft.AspNetCore.Identity;

namespace TicketReservationApp.Repositories
{
    public class PostsRepository : IPostsRepository
    {
        private readonly DataContext _dataContext;
        public PostsRepository(DataContext dataContext) 
        {
            _dataContext = dataContext;
        }

        public Posts AddPost (Posts post)
        {
            _dataContext.Posts.Add(post);
            _dataContext.SaveChanges();
            return post;
        }

        public void DeletePost(int studentID)
        {
            var timetable = _dataContext.Posts.Remove(GetPostByID(studentID));
            //var timetable = _dataContext.Timetables.Remove(GetTimetabletByID(timetableId));
            _dataContext.SaveChanges();


        }


        public Posts GetPostByID(int studentId)
        {
            Posts post = _dataContext.Posts.FirstOrDefault(post => post.Id == studentId);
            return post;

        }

        public List<Posts> GetPosts()
        {
            return _dataContext.Posts.ToList();
        }



        public Posts InsertPost(Posts post)
        {
            _dataContext.Posts.Add(post);
            _dataContext.SaveChanges();
            return post;
        }

        public void UpdatePost(Posts student)
        {
            throw new NotImplementedException();
        }
    }
}
