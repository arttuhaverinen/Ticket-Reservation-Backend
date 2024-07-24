using Microsoft.EntityFrameworkCore;
using System.Xml;
using TicketReservationApp.Data;
using TicketReservationApp.Models;

namespace TicketReservationApp.Repositories
{
    public class TicketRepository : ITicketRepository
    {
        private readonly DataContext _dataContext;
        public TicketRepository(DataContext datacontext) 
        { 
            _dataContext = datacontext;
        }
        public async Task<Tickets> DeleteTicket(int ticketId)
        {
            var timetable = await _dataContext.Tickets.FindAsync(ticketId);
            if (timetable == null)
            {
                return null;
            }
            _dataContext.Tickets.Remove(timetable);
            await _dataContext.SaveChangesAsync();
            return timetable;
        }

        public async Task<Tickets> GetTicketByID(int ticketId)
        {
            Tickets ticket = _dataContext.Tickets.FirstOrDefault(ticket => ticket.Id == ticketId);
            return ticket;
        }

        public async Task<IEnumerable<Tickets>> GetTickets()
        {
            return await _dataContext.Tickets.ToListAsync();
            
        }

        public async Task<Tickets> InsertTicket(Tickets ticket)
        {
            await _dataContext.Tickets.AddAsync(ticket);
            await _dataContext.SaveChangesAsync();
            return ticket;
        }

        public async Task<Tickets>  UpdateTicket(Tickets ticket)
        {
            _dataContext.Tickets.Update(ticket);
            await _dataContext.SaveChangesAsync();
            return ticket;
        }
    }
}
