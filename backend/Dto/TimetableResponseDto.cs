namespace TicketReservationApp.Dto
{
    public class TimetableResponseDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }

        public double Price { get; set; }

        public double? PriceDiscount { get; set; }

        public required string Departure { get; set; }

        public required string Destination { get; set; }

        public required List<string> Day { get; set; }
    }
}
