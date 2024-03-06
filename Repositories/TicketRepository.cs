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
        public void DeleteTicket(int ticketId)
        {
            _dataContext.Remove(GetTicketByID(ticketId));
        }

        public Tickets GetTicketByID(int ticketId)
        {
            Tickets ticket = _dataContext.Tickets.FirstOrDefault(ticket => ticket.Id == ticketId);
            return ticket;
        }

        public List<Tickets> GetTickets()
        {
            return _dataContext.Tickets.ToList();
            
        }

        public Tickets InsertTicket(Tickets ticket)
        {
            _dataContext.Tickets.Add(ticket);
            _dataContext.SaveChanges();
            return ticket;
        }

        public void UpdateTicket(Tickets ticket)
        {
            throw new NotImplementedException();
        }
    }
}
