using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using TicketReservationApp.Models;

namespace TicketReservationApp.Dto
{
    public class TicketDto
    {


        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }

        public DateTime Date { get; set; }

        public bool Expired { get; set; }

        public required string Departure { get; set; }

        public required string Destination { get; set; }

        public required string Name { get; set; }

        public int Seat { get; set; }

        public int TimetablesId { get; set; }

        public string? AppUserId { get; set; }

        public string? Status { get; set; }

    }
}
