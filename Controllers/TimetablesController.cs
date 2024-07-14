using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketReservationApp.Data;
using TicketReservationApp.Models;
using TicketReservationApp.Repositories;

namespace TicketReservationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimetablesController : ControllerBase
    {
        private ITimetablesRepository _timetablesRepository;

        public TimetablesController(ITimetablesRepository timetablesRepository)
        {
            _timetablesRepository = timetablesRepository;
        }

        // GET: api/Timetables
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Timetables>>> GetTimetables()
        {
            //return await _context.Timetables.ToListAsync();
            var timetables = _timetablesRepository.GetTimetables();
            return timetables;
        }

        // GET: api/Timetables/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Timetables>> GetTimetables(int id)
        {
            //var timetables = await _context.Timetables.FindAsync(id);
            var timetables = _timetablesRepository.GetTimetabletByID(id);

            if (timetables == null)
            {
                return NotFound();
            }

            return timetables;
        }
        [HttpGet]
        [Route("{departure}/{destination}")]
        public async Task<ActionResult<IEnumerable<Timetables>>> GetTimetablesByLocations(string departure, string destination)
        {
           var timetables = await _timetablesRepository.GetTimetablesByLocation(departure, destination);
            return timetables;
        }


        /*

        [HttpGet("/{paramOne}/{paramTwo}")]
        public string Get(int paramOne, int paramTwo)
        {
            return "The [Route] with multiple params worked";
        }
        */
        // PUT: api/Timetables/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /*
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTimetables(int id, Timetables timetables)
        {
            if (id != timetables.Id)
            {
                return BadRequest();
            }

            //_context.Entry(timetables).State = EntityState.Modified;
            _timetablesRepository.UpdateTimetable


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TimetablesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        */
        // POST: api/Timetables
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Timetables>> PostTimetables(Timetables timetables)
        {
            //_context.Timetables.Add(timetables);
            var timetable = _timetablesRepository.InsertTimetable(timetables);


            return timetable;
        }

        // DELETE: api/Timetables/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTimetables(int id)
        {
            var timetables = _timetablesRepository.GetTimetabletByID(id);

            if (timetables == null)
            {
                return NotFound();
            }

            _timetablesRepository.DeleteTimetable(id);
            

            return NoContent();
        }

     
    }
}
