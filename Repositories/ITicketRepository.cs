using TicketReservationApp.Models;

namespace TicketReservationApp.Repositories
{
    public interface ITicketRepository
    {
        List<Tickets> GetTickets();
        Tickets GetTicketByID(int ticketId);
        Tickets InsertTicket(Tickets ticket);
        void DeleteTicket(int ticketId);
        void UpdateTicket(Tickets ticket);
    }
}
