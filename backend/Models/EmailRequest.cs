namespace TicketReservationApp.Models
{
    public class EmailRequest
    {

            public required string RecipientEmail { get; set; }
            public required string Subject { get; set; }
            public required string Body { get; set; }
        

    }
}
