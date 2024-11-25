using Microsoft.EntityFrameworkCore;
using TicketReservationApp.Data;
using TicketReservationApp.Models;

namespace TicketReservationApp.Repositories
{
    public class UsersRepository : IUserRepository
    {
        public readonly DataContext _dataContext;
        public UsersRepository(DataContext dataContext)
        {
             _dataContext = dataContext;
        }

        public Task<AppUser> DeleteUser(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<AppUser> GetUserByID(int postId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<AppUser>> GetUsers()
        {
            //return await _dataContext.Users.ToListAsync();
            throw new NotImplementedException();

        }

        public Task<AppUser> InsertUser(AppUser user)
        {
            throw new NotImplementedException();
        }

        public Task<AppUser> UpdateUser(int id, AppUser post)
        {
            throw new NotImplementedException();
        }
    }
}
