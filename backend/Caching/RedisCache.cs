using Microsoft.Extensions.Caching.Distributed;
using Microsoft.VisualStudio.TestPlatform.CommunicationUtilities;
using System.Text.Json;

namespace TicketReservationApp.Caching
{
    public class RedisCache : IRedisCacheService
    {
        private readonly IDistributedCache _cache; 

        public RedisCache(IDistributedCache cache)
        {
            _cache = cache;
        }
        public T? GetData<T>(string key)
        {
            var data = _cache.GetString(key);

            if (data == null)
            {
                return default(T?);
            }
            return JsonSerializer.Deserialize<T>(data);
        }

        public void setData<T>(string key, T data)
        {
            var options = new DistributedCacheEntryOptions() { AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(1) };

            _cache.SetString(key, JsonSerializer.Serialize(data), options);
        }

        
    }
}
