using TicketReservationApp.Models;

namespace TicketReservationApp.Repositories
{
    public interface ITimetablesRepository
    {
        List<Timetables> GetTimetables();
        Timetables GetTimetabletByID(int timetableId);
        Timetables InsertTimetable(Timetables timetable);
        void DeleteTimetable(int timetableId);
        void UpdateTimetable(Timetables timetable);
    }
}
