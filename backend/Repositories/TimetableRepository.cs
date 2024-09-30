using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System;
using System.Reflection.Metadata.Ecma335;
using System.Xml;
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

        public async Task<IEnumerable<Timetables>> GetTimetables(string? offers)
        {
            var query = _dataContext.Timetables.AsQueryable();


            if (offers == "true")
            {
                query =  query.Where(tt => tt.PriceDiscount != null);
            }
            return await query.ToListAsync();

        }

        public async Task<Timetables> GetTimetabletByID(int timetableId)
        {
            var timetable = await _dataContext.Timetables.FirstOrDefaultAsync(timetable => timetable.Id == timetableId);
            return timetable;
        }

        public async Task<IEnumerable<Timetables>> GetTimetablesByLocation(string departure, string destination, string weekday, string date, string time)
        {
            Console.WriteLine(departure);
            Console.WriteLine(destination);
            Console.WriteLine(weekday);
            Console.WriteLine(date);
            Console.WriteLine(time);
            DateTime dt;
            
            date = date.Replace("-", "/");
            dt = DateTime.Parse(date).Date;
            Console.WriteLine(dt);

             



            IQueryable<Timetables> query = _dataContext.Timetables.Where(timetable => timetable.Departure == departure && timetable.Destination == destination && timetable.Day.Contains(weekday));

            if (!string.IsNullOrEmpty(time))
            {
                query = query.Where(timetable => timetable.StartTime.ToString() == time);
                //query = query.Include(t => t.Tickets.Where(ticket => ticket.Date.ToShortDateString() == date));
            }

            return await query
                .Include(t => t.Tickets.Where(ticket => ticket.Date.Date == dt.Date))
                .ToListAsync();
            //return timetable;
            // .Where(ticket => ticket.Date.ToShortDateString() == time)
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

/*
          public async Task<IEnumerable<Timetables>> GetTimetablesByLocation(string departure, string destination, string weekday, string time)
        {
            Console.WriteLine(departure);
            Console.WriteLine(destination);
            Console.WriteLine(weekday);

            return await _dataContext.Timetables.Where(timetable => timetable.Departure == departure && timetable.Destination == destination && timetable.Day.Contains(weekday))
                .Include(t => t.Tickets)
                .ToListAsync();
            //return timetable;
        }
*/