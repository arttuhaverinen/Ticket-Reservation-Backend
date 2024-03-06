using System.ComponentModel.DataAnnotations;

namespace TicketReservationApp.Models
{
    public class Tickets
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public bool Expired { get; set; }

        [Required]
        public string Departure { get; set; }

        [Required]
        public string Destination { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int Seat { get; set; }

        [Required]
        public string TimetablesId { get; set; }

        [Required]
        public string AppUserId { get; set; }
        //public virtual AppUser AppUser { get; set; }
    }
}
