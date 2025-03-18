using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketReservationApp.Data;
using TicketReservationApp.Dto;
using TicketReservationApp.Models;
using TicketReservationApp.Repositories;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Linq;
using NuGet.Protocol;
using System.Text.Json;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using TicketReservationApp.Caching;
using Amazon.Runtime.Internal.Util;

namespace TicketReservationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimetablesController : ControllerBase
    {
        private ITimetablesRepository _timetablesRepository;
        private readonly IRedisCacheService _redisCacheService;

        public TimetablesController(ITimetablesRepository timetablesRepository, IRedisCacheService? redisCacheService = null)
        {
            _timetablesRepository = timetablesRepository;
            _redisCacheService = redisCacheService;


        }

        // GET: api/Timetables
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TimetableDto>>> GetTimetables([FromQuery] string? offers)
        {
            var cachedTimetables = _redisCacheService?.GetData<IEnumerable<Timetables>>("timetables_cache");
            if (cachedTimetables != null)
            {
                Console.WriteLine("Returning cached Timetables");

                var cachedTimetablesDto = cachedTimetables.Select(t => new TimetableResponseDto()
                {
                    Id = t.Id,
                    EndTime = t.EndTime,
                    Day = t.Day,
                    Departure = t.Departure,
                    Destination = t.Destination,
                    Price = t.Price,
                    StartTime = t.StartTime,
                    PriceDiscount = t.PriceDiscount,
                }).ToList();

                Console.WriteLine(cachedTimetablesDto);

                return Ok(cachedTimetablesDto);

            }

            var timetables = await _timetablesRepository.GetTimetables(offers);
            _redisCacheService?.setData("timetables_cache", timetables);
            var timetablesDto = timetables.Select(t => new TimetableResponseDto()
            {
                Id = t.Id,
                EndTime = t.EndTime,
                Day = t.Day,    
                Departure = t.Departure,
                Destination = t.Destination,
                Price = t.Price,
                StartTime = t.StartTime,
                PriceDiscount = t.PriceDiscount,
            }).ToList();
           

            return Ok(timetablesDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TimetableDto>> GetTimetablesById(int id)
        {
            var timetables = await _timetablesRepository.GetTimetabletByID(id);

            if (timetables == null)
            {
                return NotFound();
            }

            var timetableDto = new TimetableResponseDto()
            {
                Id = timetables.Id,
                EndTime = timetables.EndTime,
                Day = timetables.Day,
                Departure = timetables.Departure,
                Destination = timetables.Destination,
                Price = timetables.Price,
                StartTime = timetables.StartTime,
                PriceDiscount = timetables.PriceDiscount,
            };

            return Ok(timetableDto);
        }
        [HttpGet]
        [Route("{departure}/{destination}/{date}/{time?}")]
        public async Task<ActionResult<IEnumerable<TimetableWithTicketsDto>>> GetTimetablesByLocations(string departure, string destination, string date, string? time = null )
        {
            IEnumerable<Timetables>? cachedTimetables;

            if (time == null)
            {
                cachedTimetables = _redisCacheService.GetData<IEnumerable<Timetables>>($"timetables_cache_{departure}_{destination}_{date}");
            } else
            {
                cachedTimetables = _redisCacheService.GetData<IEnumerable<Timetables>>($"timetables_cache_{departure}_{destination}_{date}_{time}");
            }

            if (cachedTimetables != null)
            {
                Console.WriteLine("Returning cached Timetables");

                var cachedTimetableDTO = cachedTimetables.Select(t => new TimetableWithTicketsDto
                {
                    Id = t.Id,
                    Date = t.Date,
                    StartTime = t.StartTime,
                    EndTime = t.EndTime,
                    Price = t.Price,
                    Departure = t.Departure,
                    Destination = t.Destination,
                    Day = t.Day,
                    Cancelled = t.Cancelled,
                    PriceDiscount = t.PriceDiscount,
                    Seats = t.Tickets?.Select(ticket => ticket.Seat.ToString()).ToList()
                });
                Console.WriteLine(cachedTimetableDTO);

                return Ok(cachedTimetableDTO);
            }


            string[] yearMonthDay = date.Split("-");

            int year = Int32.Parse(yearMonthDay[0]);
            int month = Int32.Parse(yearMonthDay[1]);
            int day = Int32.Parse(yearMonthDay[2]);

            DateTime newDate = new DateTime(year, month, day, 0, 0, 0);
            DateTime testdate = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);

            string weekday = newDate.DayOfWeek.ToString().ToLower();


            var timetables = await _timetablesRepository.GetTimetablesByLocation(departure, destination, weekday, date, time);

            if (  timetables == null )
            {
                return NotFound();
            }

            if (time == null)
            {
                _redisCacheService.setData($"timetables_cache_{departure}_{destination}_{date}", timetables);
            }
            else
            {
                _redisCacheService.setData($"timetables_cache_{departure}_{destination}_{date}_{time}", timetables);
            }
#pragma warning disable CS8602 // Dereference of a possibly null reference
            var timetableDTO = timetables
            .Select(t => new TimetableWithTicketsDto
            {
                Id = t.Id,
                Date = t.Date,
                StartTime = t.StartTime,
                EndTime = t.EndTime,
                Price = t.Price,
                Departure = t.Departure,
                Destination = t.Destination,
                Day = t.Day,
                Cancelled = t.Cancelled,
                PriceDiscount = t.PriceDiscount,
                Seats = t.Tickets?.Select(ticket => ticket.Seat.ToString()).ToList()
            });

            return Ok(timetableDTO);
        }
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TimetableWithTicketsDto>>> updateTimetable(int id, TimetableDto timetable)
        {
            var tt = new Timetables
            {
                Id = id,
                AppUserId = User.FindFirstValue(ClaimTypes.NameIdentifier),
                Date = new DateTime(),
                Cancelled = [DateTime.MinValue],
                Day = timetable.Day,
                Price= timetable.Price,
                StartTime= timetable.StartTime,
                EndTime= timetable.EndTime,
                Departure= timetable.Departure,
                Destination = timetable.Destination,
                PriceDiscount = timetable.PriceDiscount,


            };

            var updatedTimetable = await _timetablesRepository.UpdateTimetable(id, tt);
            return Ok(updatedTimetable);
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
        [Authorize]
        public async Task<ActionResult<TimetableDto>> PostTimetables(TimetableDto timetables)
        {
            var timetable = new Timetables()
            {
                EndTime = timetables.EndTime,
                Day = timetables.Day,
                Departure = timetables.Departure,
                Destination = timetables.Destination,
                Price = timetables.Price,
                StartTime = timetables.StartTime,
                Date = new DateTime(),
                AppUserId = User.FindFirstValue(ClaimTypes.NameIdentifier),
                Cancelled = [DateTime.MinValue],
                PriceDiscount = timetables.PriceDiscount,
                
            };

            var newTimetable = await _timetablesRepository.InsertTimetable(timetable);

            return Ok(timetable);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TimetableDto>> DeleteTimetables(int id)
        {
            var timetables = _timetablesRepository.GetTimetabletByID(id);

            if (timetables == null)
            {
                return NotFound();
            }

            var deletedTimetable = await _timetablesRepository.DeleteTimetable(id);

            if (deletedTimetable == null)
            {
                return NotFound();
            }

            var timetableDto = new TimetableDto()
            {
                EndTime = deletedTimetable.EndTime,
                Day = deletedTimetable.Day,
                Departure = deletedTimetable.Departure,
                Destination = deletedTimetable.Destination,
                Price = deletedTimetable.Price,
                StartTime = deletedTimetable.StartTime

            };

            return Ok(timetableDto);
        }

     
    }
}
