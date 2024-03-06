using Microsoft.Extensions.Hosting;
using TicketReservationApp.Data;
using TicketReservationApp.Models;

namespace TicketReservationApp.Repositories
{
    public class TimetableRepository : ITimetablesRepository
    {
        private readonly DataContext _dataContext;
        public TimetableRepository(DataContext datacontext) { 
            _dataContext = datacontext;
        }
        public void DeleteTimetable(int timetableId)
        {
            var timetable = _dataContext.Timetables.Remove(GetTimetabletByID(timetableId));
            
        }

        public List<Timetables> GetTimetables()
        {
            return _dataContext.Timetables.ToList();

        }

        public Timetables GetTimetabletByID(int timetableId)
        {
            Timetables timetable = _dataContext.Timetables.FirstOrDefault(timetable => timetable.Id == timetableId);
            return timetable;
        }

        public Timetables InsertTimetable(Timetables timetable)
        {
            _dataContext.Timetables.Add(timetable);
            _dataContext.SaveChanges();
            return timetable;
            throw new NotImplementedException();
        }

        public void UpdateTimetable(Timetables timetable)
        {
            throw new NotImplementedException();
        }
    }
}
