using TicketReservationApp.Models;

namespace TicketReservationApp.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<AppUser>> GetUsers();
        Task<AppUser?> GetUserByID(string postId);
        Task<AppUser> InsertUser(AppUser user);
        Task<AppUser> DeleteUser(int userId);
        Task<AppUser> UpdateUser(AppUser user);
    }
}
