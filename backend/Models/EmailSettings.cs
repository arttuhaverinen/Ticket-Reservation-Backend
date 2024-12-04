namespace TicketReservationApp.Models
{
    public class EmailSettings
    {
        public String SmtpServer { get; set; }
        public int Port { get; set; }
        public string SenderEmail { get; set; }
        public string SenderName { get; set; }
        public string Password { get; set; }

    }
}
