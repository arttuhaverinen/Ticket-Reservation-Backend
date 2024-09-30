namespace TicketReservationApp.Dto
{
    public class TimetableWithTicketsDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }

        public double Price { get; set; }

        public string Departure { get; set; }

        public string Destination { get; set; }

        public List<string> Day { get; set; }

        public List<DateTime> Cancelled { get; set; }

        public List<string> Seats { get; set; }

        public double? PriceDiscount { get; set; }
    }
}
