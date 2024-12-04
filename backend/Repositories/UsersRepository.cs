using Microsoft.EntityFrameworkCore;
using System.Xml;
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

        public async Task<AppUser> GetUserByID(string userId)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(user => user.Id == userId);
            return user;
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

        public async Task<AppUser> UpdateUser(AppUser user)
        {
            _dataContext.Users.Update(user);
            await _dataContext.SaveChangesAsync();
            return user;
        }
    }
}
