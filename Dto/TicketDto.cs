using System.ComponentModel.DataAnnotations;
using TicketReservationApp.Models;

namespace TicketReservationApp.Dto
{
    public class TicketDto
    {


        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public DateTime Date { get; set; }

        public bool Expired { get; set; }

        public string Departure { get; set; }

        public string Destination { get; set; }

        public string Name { get; set; }

        public int Seat { get; set; }

        [Required]
        public int TimetablesId { get; set; }

        [Required]
        public string AppUserId { get; set; }
    }
}
