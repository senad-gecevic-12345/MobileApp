using MediatR;

namespace MobileAppApi
{
    public class Startup
    {
        private static IConfiguration _configuration;
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public void ConfigureServices(IServiceCollection services)
        {
            _configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            services.AddControllers();
            services.AddMediatR(typeof(Startup).Assembly);
        }
    }
}
