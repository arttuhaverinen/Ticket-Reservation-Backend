using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.Cookies;
using TicketReservationApp.Repositories;
using System.Security.Claims;
using TicketReservationApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;

namespace TicketReservationApp.Controllers
{
    [ApiController]
    public class GoogleController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IOptionsMonitor<BearerTokenOptions> _bearerTokenOptions;
        private readonly IConfiguration _configuration;



        public GoogleController(IUserRepository userRepository, SignInManager<AppUser> signInManager,
        IOptionsMonitor<BearerTokenOptions> bearerTokenOptions, IConfiguration configuration
        )
        {
            _userRepository = userRepository;
            _signInManager = signInManager;
            _bearerTokenOptions = bearerTokenOptions;
            _configuration = configuration;

        }
        [HttpGet("login/google")]
        public IActionResult GoogleLogin()
        {
            Console.WriteLine("login google");
            var environment = _configuration["Environment"];
            //var redirectUrl = Url.Action("GoogleResponse", "Auth"); // Where to go after login
            //var redirectUrl = "http://localhost:5001/login-process"; // Hardcode the URL to match your callback path
            var redirectUrl = "";
            if ( environment == "Development" ) {
                 redirectUrl = "http://localhost:5173";
            }
            if (environment == "Production")
            {
                 redirectUrl = Environment.GetEnvironmentVariable("EMAIL_FRONTEND_PROD"); 
            }
            Console.WriteLine(redirectUrl);
            var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
            Console.WriteLine("login google");
            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }
        [HttpGet("signin-google")]
        public async Task<IActionResult> GoogleResponse()
        {

            Console.WriteLine("signin-google");
            var authProperties = new AuthenticationProperties
            {
                IsPersistent = true, // Make the cookie persistent
                ExpiresUtc = DateTime.UtcNow.AddDays(1) // Explicitly set expiration time
            };


            //var authenticateResult = await HttpContext.AuthenticateAsync("GoogleCookie");
            //var authenticateResult = await HttpContext.AuthenticateAsync(GoogleDefaults.AuthenticationScheme);
            /*
            if (!authenticateResult.Succeeded)
            {
                Console.WriteLine("Authentication failed");
                return Unauthorized("Google sign-in failed");
            }
            */


            Console.WriteLine("Authentication succeeded");
            // Get authentication result using Google authentication scheme
            return Ok("google sign in ok");
            //return Redirect("http://localhost:5001/weatherforecast");

        }

        [HttpGet("login-process")]
        public async Task<IActionResult> LoginProcess()
        {
            Console.WriteLine("login-process");

            // Get the authentication result for the "GoogleCookie" scheme
            //var authenticateResult = await HttpContext.AuthenticateAsync("GoogleCookie");
            var authenticateResult = await HttpContext.AuthenticateAsync("GoogleCookie");

            
            if (!authenticateResult.Succeeded)
            {
                Console.WriteLine("Authentication failed");
                return Unauthorized("Google sign-in failed");
            }
            try
            {
                // At this point, the "GoogleCookie" contains user authentication information
                // Access user details from authenticateResult.Principal
                var userEmail = authenticateResult.Principal?.FindFirst(ClaimTypes.Email)?.Value;
                var userId = authenticateResult.Principal?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                // Check if user already exists

                var user = await _userRepository.GetUserByEmail(userEmail);

                if (user == null)
                {
                    Console.WriteLine("create user");
                    var newUser = new AppUser
                    {
                        Id = Guid.NewGuid().ToString(),
                        UserName = userEmail,
                        NormalizedUserName = userEmail?.ToUpper(),
                        Email = userEmail,
                        NormalizedEmail = userEmail?.ToUpper(),
                        EmailConfirmed = true,
                        SecurityStamp = string.Empty,

                    };
                    var createdUser = await _userRepository.InsertUser(newUser);

                    var newPrincipal = await _signInManager.CreateUserPrincipalAsync(createdUser);

                    Response.Cookies.Append("GoogleCookie", string.Empty, new CookieOptions
                    {
                        Expires = DateTimeOffset.UtcNow.AddDays(-1), // Set expiration to the past
                        HttpOnly = true,  // Ensures it's an HTTP-only cookie
                    });

                    var tokens =  SignIn(newPrincipal, IdentityConstants.BearerScheme);
                    Console.WriteLine(tokens);
                    //return Redirect("http://localhost:5173");
                    return SignIn(newPrincipal, IdentityConstants.BearerScheme);

                }
                else
                {
                    var newPrincipal = await _signInManager.CreateUserPrincipalAsync(user);
                    var tokens = SignIn(newPrincipal, IdentityConstants.BearerScheme);
                    /*
                    var authProperties = new AuthenticationProperties
                    {
                        IsPersistent = true,
                        ExpiresUtc = DateTime.UtcNow.AddDays(1)
                    };
                    await HttpContext.SignInAsync("GoogleCookie", newPrincipal, authProperties);
                    */
                    Response.Cookies.Append("GoogleCookie", string.Empty, new CookieOptions
                    {
                        Expires = DateTimeOffset.UtcNow.AddDays(-1), // Set expiration to the past
                        HttpOnly = true,  // Ensures it's an HTTP-only cookie
                    });

                    Console.WriteLine(tokens);
                    return SignIn(newPrincipal, IdentityConstants.BearerScheme);

                }
            } catch (Exception ex) {
                return Unauthorized(ex.Message);
            }
            // Create user




            //Console.WriteLine($"Authenticated user: {userEmail}, ID: {userId}");
            //Console.WriteLine(authenticateResult.Properties.GetTokenValue("access_token"));
            //Console.WriteLine(authenticateResult.Properties.GetTokenValue("refresh_token"));


            // Return the JWT Bearer Token


            return Ok();
        }



    }
}
