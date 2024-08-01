using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using TicketReservationApp.Data;
using TicketReservationApp.Repositories;
using Serilog;
using Stripe;

using DotNetEnv;


var builder = WebApplication.CreateBuilder(args);

Env.Load();


builder.Configuration
    .AddEnvironmentVariables();


var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";


var apiKey = Environment.GetEnvironmentVariable("SECRET_KEY");
StripeConfiguration.ApiKey = apiKey;


//var stripeSettingsSection = builder.Configuration.GetSection("Stripe");
//StripeConfiguration.ApiKey = stripeSettingsSection["SecretKey"];

Console.WriteLine(StripeConfiguration.ApiKey);


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173",
                                              "http://www.contoso.com")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                          ;
                      });
});

// Add services to the container.

builder.Services.AddControllers();
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

builder.Services.AddAuthentication();





builder.Services.AddIdentityApiEndpoints<IdentityUser>().AddRoles<IdentityRole>().AddEntityFrameworkStores<DataContext>();



var app = builder.Build();
app.UseCors(MyAllowSpecificOrigins);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapIdentityApi<IdentityUser>();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

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
