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

    private readonly ITimetablesRepository _timetableRepository;


    public CheckoutController(IConfiguration configuration, ITicketRepository ticketRepository, EmailController emailController, ITimetablesRepository timetablesRepository)
    {
        _configuration = configuration;
        _ticketRepository = ticketRepository;
        _emailController = emailController;
        _timetableRepository = timetablesRepository;
    }
    //[Authorize]
    [HttpPost]
    public async Task<ActionResult> CheckoutOrder([FromBody] TicketDto product, [FromServices] IServiceProvider sp)
    {
        try
        {
            var timetable = await _timetableRepository.GetTimetabletByID(product.TimetablesId);
            if (timetable == null)
            {
                throw new Exception("Timetable not found."); // Manually throw an exception
            }

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
                Console.WriteLine("thisApiUrl");
                Console.WriteLine(thisApiUrl);
            }

            var userId = User?.Identity?.IsAuthenticated == true ? User.FindFirstValue(ClaimTypes.NameIdentifier) : null;

            Console.WriteLine(product);
            Console.WriteLine(JsonSerializer.Serialize(product));

            // Create a pending ticket

            Tickets ticket = new Tickets()
            {
                StartTime = timetable.StartTime,
                EndTime = timetable.EndTime,
                Departure = timetable.Departure,
                Destination = timetable.Destination,
                AppUserId = userId,
                Name = product.Name,
                TimetablesId = timetable.Id,
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
        } catch (Exception ex)
        {
            Console.WriteLine(ex.ToString());
            return StatusCode(500);
        }
        }

        //[Authorize]
        [NonAction]
        public async Task<string> CheckOut(TicketDto product, string thisApiUrl, int ticketId)
        {
            Console.WriteLine("checkout");
            Console.WriteLine(ticketId.ToString());
        try
        {
            var timetable = await _timetableRepository.GetTimetabletByID(product.TimetablesId);
            if (timetable == null)
            {
                throw new Exception("Timetable not found."); // Manually throw an exception
            }

            var finalPrice = 00.00;


            if (timetable != null) {

                finalPrice = timetable.PriceDiscount ?? timetable.Price;

            }
            var finalPriceLong = Convert.ToInt64(finalPrice * 100); 

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
                            UnitAmount = finalPriceLong, // cents
                            Currency = "USD",
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = $"{timetable!.Departure} ({timetable.StartTime}) - {timetable.Destination} ({timetable.EndTime}) | Pvm: {product.Date} | Istumapaikka: {product.Seat}"

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
        } catch (Exception ex)
        {
            Console.WriteLine(ex.ToString());
            throw;
        }
        }

        [HttpGet("success")]
        // Automatic query parameter handling from ASP.NET.
        public async Task<ActionResult> CheckoutSuccess(string sessionId)
        {
            Console.WriteLine("success");
        Console.WriteLine(sessionId);

            var sessionService = new SessionService();
            var session = sessionService.Get(sessionId);

        if (session.AmountTotal.HasValue)
        {
            var total = session.AmountTotal.Value;

        }

        var customerEmail = session.CustomerDetails.Email;

            // Create new ticket after payment

            var ticketId = int.Parse(session.Metadata["ticketId"]);
        Console.WriteLine("ticketId");
        Console.WriteLine(ticketId.ToString());


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
            //HttpContext.Response.Redirect(prod_client_url + "/success", permanent: false);
            //return new EmptyResult(); // End execution after redirect
            return Redirect(prod_client_url + "/success");

        } 
        else 
        {
        return Redirect(s_wasmClientURL + "success");
        }
    }
}
