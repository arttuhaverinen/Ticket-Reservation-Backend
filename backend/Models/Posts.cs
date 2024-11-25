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
        [Required]
        public int Id { get; set; }

        [Required]
        public string PostTitle { get; set; }

        [Required]
        public string PostContent { get; set; }

        public string PostType { get; set; }

        public string AppUserId { get; set; }

        public AppUser AppUser { get; set; }

        public string? TestField { get; set; }





    }
}
