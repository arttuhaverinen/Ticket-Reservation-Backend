using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using TicketReservationApp.Data;
using TicketReservationApp.Dto;
using TicketReservationApp.Models;
using TicketReservationApp.Repositories;

namespace TicketReservationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {

        private readonly ITicketRepository _ticketRepository;
        public TicketsController(ITicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }



        // GET: api/Tickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TicketDto>>> GetTickets()
        {
            var tickets = await _ticketRepository.GetTickets();
            var ticketsDto = tickets.Select(t => new TicketDto()
            {
                //AppUserId = User.FindFirstValue(ClaimTypes.NameIdentifier),
                //Date = t.Date,
                Departure = t.Departure,
                Destination = t.Destination,
                EndTime = t.EndTime,
                Expired = t.Expired,
                Name = t.Name,
                Seat = t.Seat,
                StartTime = t.StartTime,
                //TimetablesId = t.TimetablesId
            }).ToList();

            return ticketsDto;
        }
        /*
        [Authorize(Roles = "Admin")]
        [HttpGet]
        
        [Route("ByUsers")]
        public async Task<ActionResult<IEnumerable<Tickets>>> GetTicketsByUser()
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);
            Console.WriteLine("tickets, user id");
            Console.WriteLine(userName);
            return  _context.Tickets.Where(ticket => ticket.Name.Contains(userName)).ToList();
        }
        [HttpGet]
        [Route("ByTimetable/{id}")]
        public async Task<ActionResult<IEnumerable<Tickets>>> GetTicketsByUser(int id)
        {
            return _context.Tickets.Where(ticket => ticket.TimetablesId.Equals(id)).ToList();
        }
        */
        // GET: api/Tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TicketDto>> GetTickets(int id)
        {
            var tickets = await _ticketRepository.GetTicketByID(id);

            var TicketDto = new TicketDto()
            {
                Date = tickets.Date,
                Departure = tickets.Departure,
                Destination = tickets.Destination,
                EndTime = tickets.EndTime,
                Expired = tickets.Expired,
                Name = tickets.Name,
                Seat = tickets.Seat,
                StartTime = tickets.StartTime,
                TimetablesId = tickets.TimetablesId
            };

            return TicketDto;
        }

        // PUT: api/Tickets/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<TicketDto>> PutTickets(int id, TicketDto ticket)
        {
            var Updateticket = new Tickets()
            {
                AppUserId = User.FindFirstValue(ClaimTypes.NameIdentifier),
                Date = ticket.Date,
                Departure = ticket.Departure,
                Destination = ticket.Destination,
                EndTime = ticket.EndTime,
                Expired = ticket.Expired,
                Name = ticket.Name,
                Seat = ticket.Seat,
                StartTime = ticket.StartTime,
                TimetablesId = ticket.TimetablesId
            };

            var updatedTicket = await _ticketRepository.UpdateTicket(Updateticket);
            return ticket; 
        }

        // POST: api/Tickets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<TicketDto>> PostTickets(TicketDto tickets)
        {
            Tickets addTicket = new Tickets()
            {
                AppUserId = User.FindFirstValue(ClaimTypes.NameIdentifier),
                Date = tickets.Date,
                Departure = tickets.Departure,
                Destination = tickets.Destination,
                EndTime = tickets.EndTime,
                Expired = tickets.Expired,
                Name = tickets.Name,
                Seat = tickets.Seat,
                StartTime = tickets.StartTime,
                TimetablesId = tickets.TimetablesId

            };
            var addedTicket = await _ticketRepository.InsertTicket(addTicket);

            return tickets;
        }

        // DELETE: api/Tickets/5
        
        [HttpDelete("{id}")]
        public async Task<ActionResult<TicketDto>> DeleteTickets(int id)
        {
            var deletedTicket = await _ticketRepository.DeleteTicket(id);

            var deletedTicketDto = new TicketDto()
            {
                Date = deletedTicket.Date,
                Departure = deletedTicket.Departure,
                Destination = deletedTicket.Destination,
                EndTime = deletedTicket.EndTime,
                Expired = deletedTicket.Expired,
                Name = deletedTicket.Name,
                Seat = deletedTicket.Seat,
                StartTime = deletedTicket.StartTime,
                TimetablesId = deletedTicket.TimetablesId
            };

            return deletedTicketDto;
        }
        /*

        private bool TicketsExists(int id)
        {
            return _context.Tickets.Any(e => e.Id == id);
        }
        */
    }
        
}
