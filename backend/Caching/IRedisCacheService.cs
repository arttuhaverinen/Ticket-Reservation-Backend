namespace TicketReservationApp.Caching
{
    public interface IRedisCacheService
    {
        T? GetData<T>(string key);
        void setData<T>(string key, T data);
    }
}
