using Microsoft.AspNetCore.Mvc;
using TicketReservationApp.Models;

namespace TicketReservationApp.Repositories
{
    public interface ITimetablesRepository
    {
        Task<IEnumerable<Timetables>> GetTimetables(string? offers);
        Task<Timetables?> GetTimetabletByID(int timetableId);
        Task<Timetables> InsertTimetable(Timetables timetable);
        Task<Timetables?> DeleteTimetable(int timetableId);
        Task<Timetables> UpdateTimetable(int timetableId, Timetables timetable);

        Task<IEnumerable<Timetables?>> GetTimetablesByLocation(string departure, string location, string weekday, string date, string time);
    }
}
