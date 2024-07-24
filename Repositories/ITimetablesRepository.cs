using Microsoft.AspNetCore.Mvc;
using TicketReservationApp.Models;

namespace TicketReservationApp.Repositories
{
    public interface ITimetablesRepository
    {
        Task<IEnumerable<Timetables>> GetTimetables();
        Task<Timetables> GetTimetabletByID(int timetableId);
        Task<Timetables> InsertTimetable(Timetables timetable);
        Task<Timetables> DeleteTimetable(int timetableId);
        Task<Timetables> UpdateTimetable(int timetableId, Timetables timetable);

        Task<ActionResult<IEnumerable<Timetables>>> GetTimetablesByLocation(string departure, string location);
    }
}
