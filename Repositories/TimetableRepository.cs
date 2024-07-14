using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System.Reflection.Metadata.Ecma335;
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
            _dataContext.Timetables.Remove(GetTimetabletByID(timetableId));
            _dataContext.SaveChangesAsync();
            
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

        public async Task<ActionResult<IEnumerable<Timetables>>> GetTimetablesByLocation(string departure, string destination)
        {
            var timetable =  _dataContext.Timetables.Where(timetable => timetable.Departure == departure && timetable.Destination == destination).ToList();
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
