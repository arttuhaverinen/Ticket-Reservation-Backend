using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using TicketReservationApp.Data;
using TicketReservationApp.Repositories;
using Serilog;
using Stripe;

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

//using Microsoft.AspNetCore.Authentication.JwtBearer;


var builder = WebApplication.CreateBuilder(args);

Env.Load();


builder.Configuration
    .AddEnvironmentVariables();

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

Console.WriteLine(Environment.GetEnvironmentVariable("DB_CONNECTION_STRING"));

var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

Console.WriteLine(environment);

if (environment == "Test")
{
    builder.Configuration.AddInMemoryCollection(new Dictionary<string, string>
{
    { "ConnectionStrings:DefaultConnection", Environment.GetEnvironmentVariable("DB_CONNECTION_STRING_TEST") }
});
}
else
{
    builder.Configuration.AddInMemoryCollection(new Dictionary<string, string>
{
    { "ConnectionStrings:DefaultConnection", Environment.GetEnvironmentVariable("DB_CONNECTION_STRING") }
});
}




var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";


var apiKey = Environment.GetEnvironmentVariable("SECRET_KEY");
StripeConfiguration.ApiKey = apiKey;

builder.Configuration.AddInMemoryCollection(new Dictionary<string, string>
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
var endpoint = "http://localhost:9000"; // Your MinIO endpoint (use the correct URL here)
var accessKey = "admin";           // Your MinIO access key
var secretKey = "your-secret-password";           // Your MinIO secret key
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

builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});


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



var app = builder.Build();

//app.MapFallbackToFile("index.html");
//app.MapFallbackToFile("/busapp/{*path:nonfile}", "index.html");


//app.UseStaticFiles();
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
if (app.Environment.IsDevelopment())
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
