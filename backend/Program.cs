using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using TicketReservationApp.Data;
using TicketReservationApp.Repositories;
using Serilog;
using Stripe;
using Serilog.Sinks.Elasticsearch;
using Serilog.Expressions;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Build.Execution;
using Microsoft.Extensions.Hosting;
using Minio;

using Amazon;
using Amazon.S3;
using Amazon.Runtime;
using TicketReservationApp.Models;
using Microsoft.AspNetCore.Identity.UI.Services;
using System.Data;

//using Microsoft.AspNetCore.Authentication.JwtBearer;

// dotnet run --launch-profile Test

var builder = WebApplication.CreateBuilder(args);

Env.Load();

var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

Serilog.Debugging.SelfLog.Enable(Console.WriteLine);

var excludePatterns = new[] {
    "Executing endpoint",
    "Route matched with",
    "Executed action",
    "Executed endpoint",
    "Executed DbCommand",
    "Executing OkObjectResult",
    "Executing ObjectResult",
    "CORS policy execution successful",
    "Executing OkObjectResult",
    "Request starting",
    "ObjectResultExecuting",
    "Executing {ObjectResultType}",
};

builder.Host.UseSerilog((context, services, configuration) =>
{
    Console.WriteLine("logging");
    //var environment = context.HostingEnvironment.EnvironmentName;

    //Local Console Logging (logs everything)
    configuration.Enrich.FromLogContext()
                 .Enrich.WithProperty("Environment", environment)
                 .WriteTo.Console();
    //configuration
    //.Enrich.FromLogContext()
    //.WriteTo.Console();
    //.Filter.ByExcluding(e => excludePatterns.Any(pattern => e.MessageTemplate.Text.Contains(pattern)));
    Console.WriteLine(Environment.GetEnvironmentVariable("ELASTICSEARCH_URI"));
    var url = Environment.GetEnvironmentVariable("ELASTICSEARCH_URI");
    Console.WriteLine(url);
    var elasticsearchUri = Environment.GetEnvironmentVariable("DEV_ELASTICSEARCH_URI");

    if (url != null && environment == "Production")
        {
        Console.WriteLine("if");
        configuration.WriteTo.Elasticsearch(new ElasticsearchSinkOptions(new Uri(url))
        {
            //FailureCallback = e => Console.WriteLine("Unable to submit event " + e.MessageTemplate),
            //IndexFormat = $"elasticsearch-logs-{DateTime.UtcNow:yyyy-MM}",
            //IndexFormat = "elasticsearch-logs-{0:yyyy-MM}",
            ModifyConnectionSettings = settings => settings.RequestTimeout(TimeSpan.FromSeconds(30)),
            AutoRegisterTemplate = true,
            NumberOfShards = 1,
            NumberOfReplicas = 1,
            AutoRegisterTemplateVersion = AutoRegisterTemplateVersion.ESv7
        })
        .Filter.ByExcluding(e => excludePatterns.Any(pattern => e.MessageTemplate.Text.Contains(pattern)))
        .Enrich.WithProperty("Environment", context.HostingEnvironment.EnvironmentName).ReadFrom.Configuration(context.Configuration);

    }
    else if (!string.IsNullOrEmpty(elasticsearchUri))
        {
        Console.WriteLine("else");
        //Console.WriteLine(context.Configuration["ElasticConfiguration:Uri"]);
        

        configuration.WriteTo.Elasticsearch(new ElasticsearchSinkOptions(new Uri(elasticsearchUri))
            {
                //IndexFormat = $"elasticsearch-logs-{DateTime.UtcNow:yyyy-MM}",
                AutoRegisterTemplate = true,
                NumberOfShards = 1,
                NumberOfReplicas = 1,
                AutoRegisterTemplateVersion = AutoRegisterTemplateVersion.ESv7

        })
        .Filter.ByExcluding(e => excludePatterns.Any(pattern => e.MessageTemplate.Text.Contains(pattern)))
       .Enrich.WithProperty("Environment", context.HostingEnvironment.EnvironmentName).ReadFrom.Configuration(context.Configuration);

    };
 
}); 



builder.Configuration
    .AddEnvironmentVariables();

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

Console.WriteLine("DB_CONNECTION_STRING");
Console.WriteLine(Environment.GetEnvironmentVariable("DB_CONNECTION_STRING"));

Console.WriteLine("ELASTICSEARCH_URI");

Console.WriteLine(Environment.GetEnvironmentVariable("ELASTICSEARCH_URI"));

Console.WriteLine(environment);

var DB_CONNECTION_STRING = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
if (environment != "Test" && !string.IsNullOrEmpty(DB_CONNECTION_STRING))
{
    builder.Configuration.AddInMemoryCollection(new Dictionary<string, string?>
{
    { "ConnectionStrings:DefaultConnection", DB_CONNECTION_STRING }

});
}

/*
else
{
    builder.Configuration.AddInMemoryCollection(new Dictionary<string, string>
{
    { "ConnectionStrings:DefaultConnection", Environment.GetEnvironmentVariable("DB_CONNECTION_STRING") }
});
}
*/


var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";


var apiKey = Environment.GetEnvironmentVariable("SECRET_KEY");
StripeConfiguration.ApiKey = apiKey;

builder.Configuration.AddInMemoryCollection(new Dictionary<string, string?>
{
    { "EmailSettings:Password", Environment.GetEnvironmentVariable("EMAIL_PASSWORD") }
});

//var stripeSettingsSection = builder.Configuration.GetSection("Stripe");
//StripeConfiguration.ApiKey = stripeSettingsSection["SecretKey"];

var appSettings = builder.Configuration;
Console.WriteLine($"Email Password: {appSettings["EmailSettings:Password"]}");
Console.WriteLine("test");


Console.WriteLine(StripeConfiguration.ApiKey);
DateTime date = DateTime.SpecifyKind(new DateTime(2024, 7, 19, 9, 0, 0), DateTimeKind.Utc);
Console.WriteLine(DateTime.Today.DayOfWeek);
Console.WriteLine(date.DayOfWeek);


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          //policy.WithOrigins("http://localhost:5173",
                            policy.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                          ;
                      });
});
//var endpoint = "http://localhost:9000"; // Your MinIO endpoint (use the correct URL here)
//var accessKey = Environment.GetEnvironmentVariable("MINIO_ROOT_USER");
//var secretKey = Environment.GetEnvironmentVariable("MINIO_ROOT_PASSWORD");
var endpoint = "http://dev-minio:9000"; // Your MinIO endpoint (use the correct URL here)
var accessKey = "admin";           // Your MinIO access key
var secretKey = "your-secret-password";           // Your MinIO secret key

Console.WriteLine(accessKey);
Console.WriteLine(secretKey);


//var region = RegionEndpoint.USEast1;    // Use any region (e.g., us-east-1)

var credentials = new BasicAWSCredentials(accessKey, secretKey);
var config = new AmazonS3Config
{
    ServiceURL = endpoint,           // MinIO endpoint
    ForcePathStyle = true,           // MinIO uses path-style addressing
   // RegionEndpoint = region         // MinIO region
};
builder.Services.AddSingleton<IAmazonS3>(new AmazonS3Client(credentials, config));


//var bucketName = "test"; // Replace with your desired bucket name


// Add Minio using the default endpoint

// Add Minio using the custom endpoint and configure additional settings for default MinioClient initialization


// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options => { options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles; }) ;
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme { 
        In = ParameterLocation.Header,
        Name = "Authorization", 
        Type = SecuritySchemeType.ApiKey 
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .WriteTo.Console()
    .CreateLogger();





builder.Services.AddScoped<IPostsRepository, PostsRepository>();
builder.Services.AddScoped<ITimetablesRepository, TimetableRepository>();
builder.Services.AddScoped<ITicketRepository, TicketRepository>();
builder.Services.AddScoped<IUserRepository, UsersRepository>(); // Change to your actual repository and interface
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
builder.Services.AddTransient<IEmailSender, EmailController>();
builder.Services.AddScoped<EmailController>();  // or AddTransient/ AddSingleton depending on your use case

/*
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer();
*/
builder.Services.AddAuthentication();

builder.Services.AddAuthorization();





//builder.Services.AddIdentityApiEndpoints<IdentityUser>().AddRoles<IdentityRole>().AddEntityFrameworkStores<DataContext>();
builder.Services.AddIdentityApiEndpoints<AppUser>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<DataContext>();

builder.Services.Configure<IdentityOptions>(options =>
{
    // Require confirmed email for login
    options.SignIn.RequireConfirmedEmail = true;
});

builder.Services.AddScoped<DatabaseSeeder>(); // Assuming you have a DatabaseSeeder class

builder.Services.AddDbContext<DataContext>(options =>

{

    if (environment == "Test")
    {
        Console.WriteLine("TEST ENV");
        options.UseInMemoryDatabase("InMemoryDb");


    }
    else
    {
        Console.WriteLine("DEV ENV");
        //Console.WriteLine("Seeding completed.");

        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));


    }
});



var app = builder.Build();






//app.MapFallbackToFile("index.html");
//app.MapFallbackToFile("/busapp/{*path:nonfile}", "index.html");


//app.UseStaticFiles();
if (environment == "Test")
{
    using (var scope = app.Services.CreateScope())
    {
        var seeder = scope.ServiceProvider.GetRequiredService<DatabaseSeeder>();
        await seeder.Seed();
        Console.WriteLine("Seeding completed.");
    }
}

using (var scope = app.Services.CreateScope()) // Create a scope to resolve scoped services
{
    // Manually trigger seeding if 'seed' argument is passed
    if (args.Contains("seed"))
    {
        var seeder = scope.ServiceProvider.GetRequiredService<DatabaseSeeder>(); // Resolve DatabaseSeeder inside the scope
        await seeder.Seed(); // Call the seeding method
        Console.WriteLine("Seeding completed.");
    }
}


app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});


app.UseCors(MyAllowSpecificOrigins);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.EnvironmentName == "Test")
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



//app.MapIdentityApi<IdentityUser>();
app.MapIdentityApi<AppUser>();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();


/*
using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var roles = new[] { "Admin", "User" };
    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }

        
    }
}
*/
/*
using (var scope = app.Services.CreateScope())
{
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();

    string email = "admin@admin.com";
    string password = "Test123?";

    if (await userManager.FindByEmailAsync(email) == null)
    {
        var user = new IdentityUser();
        user.Id = "1";
        user.Email = email;
        user.UserName = email;
        await userManager.CreateAsync (user, password);

        await userManager.AddToRoleAsync(user, "Admin");
    }

}
*/
app.Run();
