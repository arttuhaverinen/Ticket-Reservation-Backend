namespace TicketReservationApp.Dto
{
    public class TimetableDto
    {
        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public double Price { get; set; }

        public string Departure { get; set; }

        public string Destination { get; set; }

        public string Day { get; set; }
    }
}
