using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace TicketReservationApp.Models
{
    public class Posts
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]  // Ensures auto-increment
        public int Id { get; set; }

        [Required]
        public required string PostTitle { get; set; }

        [Required]
        public required string PostContent { get; set; }

        public required string PostType { get; set; }

        public string? AppUserId { get; set; }

        public AppUser? AppUser { get; set; }

        public string? TestField { get; set; }





    }
}
