using System.ComponentModel.DataAnnotations;

namespace TicketReservationApp.Models
{
    public class Timetables
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public string Departure { get; set; }

        [Required]
        public string Destination { get; set; }

        [Required]
        public string Day { get; set; }
    }
}
