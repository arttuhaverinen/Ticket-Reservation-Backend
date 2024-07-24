using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public async Task<Timetables> DeleteTimetable(int timetableId)
        {
            var timetable = await _dataContext.Timetables.FindAsync(timetableId);
            if (timetable == null)
            {
                return null;
            }
            _dataContext.Timetables.Remove(timetable);
            await _dataContext.SaveChangesAsync();
            return timetable;

        }

        public async Task<IEnumerable<Timetables>> GetTimetables()
        {
            return await _dataContext.Timetables.ToListAsync();

        }

        public async Task<Timetables> GetTimetabletByID(int timetableId)
        {
            var timetable = await _dataContext.Timetables.FirstOrDefaultAsync(timetable => timetable.Id == timetableId);
            return timetable;
        }

        public async Task<ActionResult<IEnumerable<Timetables>>> GetTimetablesByLocation(string departure, string destination)
        {
            var timetable =  _dataContext.Timetables.Where(timetable => timetable.Departure == departure && timetable.Destination == destination).ToList();
            return timetable;
        }

        public async Task<Timetables> InsertTimetable(Timetables timetable)
        {
            await _dataContext.Timetables.AddAsync(timetable);
            _dataContext.SaveChanges();
            return timetable;
            
        }

        public async Task<Timetables> UpdateTimetable(int id, Timetables timetable)
        {
            _dataContext.Timetables.Update(timetable);
            await _dataContext.SaveChangesAsync();
            return timetable;
        }


    }
}
