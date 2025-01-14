namespace TicketReservationApp.Models
{
    public class EmailSettings
    {
        public required String SmtpServer { get; set; }
        public int Port { get; set; }
        public required string SenderEmail { get; set; }
        public required string SenderName { get; set; }
        public required string Password { get; set; }

    }
}
