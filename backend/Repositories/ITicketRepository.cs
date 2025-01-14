using TicketReservationApp.Models;

namespace TicketReservationApp.Repositories
{
    public interface ITicketRepository
    {
        Task<IEnumerable<Tickets>> GetTickets();
        Task<Tickets?> GetTicketByID(int ticketId);
        Task<Tickets> InsertTicket(Tickets ticket);
        Task<Tickets?> DeleteTicket(int ticketId);
        Task<Tickets> UpdateTicket(Tickets ticket);
        Task<IEnumerable<Tickets>> GetTicketByUser( string token);
    }
}
