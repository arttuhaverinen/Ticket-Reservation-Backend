using Microsoft.Extensions.Caching.Memory;
using System.Text.Json;

namespace TicketReservationApp.Caching
{
    public class TestInMemoryCache : IRedisCacheService
    {
        private readonly IMemoryCache _memoryCache;

        public TestInMemoryCache(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        public T? GetData<T>(string key)
        {
            if (_memoryCache.TryGetValue(key, out T? data))
            {
                return data;
            }
            return default(T?);
        }

        public void setData<T>(string key, T data)
        {
            _memoryCache.Set(key, data, new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(1)
            });
        }
    }
}