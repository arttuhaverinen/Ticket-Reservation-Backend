using TicketReservationApp.Dto;
using TicketReservationApp.Models;

namespace TicketReservationApp.Repositories
{
    public interface IPostsRepository 
    {


        Task<IEnumerable<Posts>> GetPosts();
        Task<Posts> GetPostByID(int postId);
        Task<Posts> InsertPost(Posts post);
        Task<Posts> DeletePost(int postId);
        Task<Posts> UpdatePost(int id, Posts post);


    }
}