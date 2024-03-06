using TicketReservationApp.Models;

namespace TicketReservationApp.Repositories
{
    public interface IPostsRepository 
    {


        List<Posts> GetPosts();
        Posts GetPostByID(int studentId);
        Posts InsertPost(Posts student);
        void DeletePost(int studentID);
        void UpdatePost(Posts student);


    }
}