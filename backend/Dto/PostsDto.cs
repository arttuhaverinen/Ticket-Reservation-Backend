using System.Diagnostics.CodeAnalysis;
using TicketReservationApp.Models;

namespace TicketReservationApp.Dto
{
    public class PostsDto
    {
        public required string PostTitle { get; set; }

        public required string PostContent { get; set; }

        public required string PostType { get; set; }

        public string? AppUserId { get; set; }

    }
}
