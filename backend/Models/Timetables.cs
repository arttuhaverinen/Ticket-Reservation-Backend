using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace TicketReservationApp.Models
{
    public class Timetables
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]  // Ensures auto-increment
        public int Id { get; set; }

        [Required] 
        public DateTime Date { get; set; }

        [Required]
        public TimeSpan StartTime { get; set; }

        [Required]
        public TimeSpan EndTime { get; set; }

        [Required]
        public double Price { get; set; }

        public double? PriceDiscount { get; set; }

        [Required]
        public string Departure { get; set; }

        [Required]
        public string Destination { get; set; }

        [Required]
        public List<string> Day { get; set; }

        public List<DateTime> Cancelled { get; set; }

        public ICollection<Tickets> Tickets { get; }

        public string AppUserId { get; set; }

        public AppUser AppUser { get; set; }


    }
}
