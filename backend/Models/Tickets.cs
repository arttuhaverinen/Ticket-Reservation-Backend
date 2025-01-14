using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace TicketReservationApp.Models
{
    public class Tickets
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]  // Ensures auto-increment
        public int Id { get; set; }

        [Required]
        public TimeSpan StartTime { get; set; }

        [Required]
        public TimeSpan EndTime { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public bool Expired { get; set; }

        [Required]
        public required string Departure { get; set; }

        [Required]
        public required string Destination { get; set; }

        [Required]
        public required string Name { get; set; }

        [Required]
        public int Seat { get; set; }

        [Required]
        public int TimetablesId { get; set; }

        public  Timetables? Timetables { get; set; }

        public string? AppUserId { get; set; }

        public AppUser? AppUser { get; set; }

        public string? Status { get; set; }
    }
}
