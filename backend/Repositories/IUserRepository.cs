using TicketReservationApp.Models;

namespace TicketReservationApp.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<AppUser>> GetUsers();
        Task<AppUser> GetUserByID(int postId);
        Task<AppUser> InsertUser(AppUser user);
        Task<AppUser> DeleteUser(int userId);
        Task<AppUser> UpdateUser(int id, AppUser post);
    }
}
