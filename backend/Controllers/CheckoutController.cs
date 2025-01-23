namespace TicketReservationApp.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using Stripe.Climate;
using System.Security.Claims;
using System.Text.Json;
using System.Xml.Linq;
using TicketReservationApp.Dto;
using TicketReservationApp.Models;
using TicketReservationApp.Repositories;
using static System.Net.WebRequestMethods;

[ApiController]
[Route("[controller]")]
/*[ApiExplorerSettings(IgnoreApi = true)]*/
public class CheckoutController : ControllerBase
{
    private readonly IConfiguration _configuration;

    private static string? s_wasmClientURL = string.Empty;

    private readonly ITicketRepository _ticketRepository;

    private readonly EmailController _emailController;


    public CheckoutController(IConfiguration configuration, ITicketRepository ticketRepository, EmailController emailController)
    {
        _configuration = configuration;
        _ticketRepository = ticketRepository;
        _emailController = emailController;
    }
    //[Authorize]
    [HttpPost]
    public async Task<ActionResult> CheckoutOrder([FromBody] TicketDto product, [FromServices] IServiceProvider sp)
    {
        var referer = Request.Headers.Referer;
        s_wasmClientURL = referer[0];

        // Build the URL to which the customer will be redirected after paying.
        var server = sp.GetRequiredService<IServer>();

        var serverAddressesFeature = server.Features.Get<IServerAddressesFeature>();

        string? thisApiUrl = null;

        if (serverAddressesFeature is not null)
        {
            //thisApiUrl = serverAddressesFeature.Addresses.FirstOrDefault();
            thisApiUrl = "http://localhost:5001";
            Console.WriteLine(thisApiUrl);
        }

        var userId = User?.Identity?.IsAuthenticated == true ? User.FindFirstValue(ClaimTypes.NameIdentifier) : null;

        Console.WriteLine(product);
        Console.WriteLine(JsonSerializer.Serialize(product));

        // Create a pending tickeg

        Tickets ticket = new Tickets()
        {
            StartTime = new TimeSpan(10, 0, 0),
            EndTime = new TimeSpan(12, 0, 0),
            Departure = product.Departure,
            Destination = product.Destination,
            AppUserId = userId,
            Name = product.Name,
            TimetablesId = product.TimetablesId,
            Expired = false,
            Seat = product.Seat,
            Date = product.Date,
            Status = "pending"

        };

        //await _emailController.SendOrderSucceededEmail(ticket, ticket.Name);


        var newTicket = await _ticketRepository.InsertTicket(ticket);

        Console.WriteLine(ticket.Id);

        if (thisApiUrl is not null)
        {
            var sessionId = await CheckOut(product, thisApiUrl, ticket.Id);
            var pubKey = _configuration["Stripe:PubKey"];

            Console.WriteLine(sessionId);
            Console.WriteLine(pubKey);

            var checkoutOrderResponse = new CheckoutOrderResponse()
            {
                SessionId = sessionId,
                PubKey = pubKey
            };





            return Ok(checkoutOrderResponse);
            }
            else
            {
                return StatusCode(500);
            }
        }
        //[Authorize]
        [NonAction]
        public async Task<string> CheckOut(TicketDto product, string thisApiUrl, int ticketId)
        {
            Console.WriteLine("checkout");

        // Create a payment flow from the items in the cart.
        // Gets sent to Stripe API.
        var options = new SessionCreateOptions
            {
                // Stripe calls the URLs below when certain checkout events happen such as success and failure.
                //SuccessUrl = $"{thisApiUrl}/checkout/success?sessionId=" + "{CHECKOUT_SESSION_ID}", // Customer paid.
                //SuccessUrl = $"{thisApiUrl}/checkout/success?sessionId=" + "{CHECKOUT_SESSION_ID}", // Customer paid. TOIMIVA AIEMMIN
                SuccessUrl = $"{thisApiUrl}/checkout/success?sessionId={{CHECKOUT_SESSION_ID}}", // Use double braces to escape curly braces

                //SuccessUrl = $"{thisApiUrl}/checkout/success?sessionId={CHECKOUT_SESSION_ID}",

            CancelUrl = s_wasmClientURL + "failed",  // Checkout cancelled.
                PaymentMethodTypes = new List<string> 
                {
                    "card"
                },
                LineItems = new List<SessionLineItemOptions>
                {
                    new()
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            UnitAmount = 2000, // cents
                            Currency = "USD",
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = $"{product.Departure} ({product.StartTime}) - {product.Destination} ({product.EndTime}) | Pvm: {product.Date} | Istumapaikka: {product.Seat}"

                            },
                        },
                        Quantity = 1,
                    },
                },
                Mode = "payment", // One-time payment.
                Metadata = new Dictionary<string, string> { { "ticketId", ticketId.ToString() } }
            };

            var service = new SessionService();
            var session = await service.CreateAsync(options);

            return session.Id;
        }

        [HttpGet("success")]
        // Automatic query parameter handling from ASP.NET.
        public async Task<ActionResult> CheckoutSuccess(string sessionId)
        {
            Console.WriteLine("success");

            var sessionService = new SessionService();
            var session = sessionService.Get(sessionId);

        if (session.AmountTotal.HasValue)
        {
            var total = session.AmountTotal.Value;

        }

        var customerEmail = session.CustomerDetails.Email;

            // Create new ticket after payment

            var ticketId = int.Parse(session.Metadata["ticketId"]);

            var pendingTicket = await _ticketRepository.GetTicketByID(ticketId);

            if (pendingTicket == null)
            {
                // This should never happen, but handle it gracefully if it does.
                throw new InvalidOperationException($"No ticket found with ID {ticketId}. This should not happen.");
            }

            pendingTicket.Status = "paid";

            var paidTicket = await _ticketRepository.UpdateTicket(pendingTicket);

            Console.WriteLine(JsonSerializer.Serialize(paidTicket));
            await _emailController.SendOrderSucceededEmail(paidTicket, paidTicket.Name);

        Console.WriteLine("wasmclienturl");
        Console.WriteLine(s_wasmClientURL);

        var environment = _configuration["Environment"];
        Console.WriteLine(environment);
        if (environment == "Production" ) {
            var prod_client_url = Environment.GetEnvironmentVariable("EMAIL_FRONTEND_PROD");
            return Redirect(s_wasmClientURL + "success");
        } 
        else 
        {
        return Redirect(s_wasmClientURL + "success");
        }
    }
}