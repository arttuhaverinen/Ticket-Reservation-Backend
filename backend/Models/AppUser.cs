
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace TicketReservationApp.Models
{
    public class AppUser : IdentityUser
    {

        public int TicketsId { get; set; }
        public ICollection<Tickets>? Tickets { get; set; }


        public int PostsId { get; set; }
        public ICollection<Posts>? Posts { get; set; }

        public string? ProfileImage {  get; set; }
    }
}

