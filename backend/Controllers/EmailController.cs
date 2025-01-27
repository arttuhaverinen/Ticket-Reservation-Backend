using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MailKit.Net.Smtp;
using MimeKit;
using TicketReservationApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using static System.Net.Mime.MediaTypeNames;
using NuGet.Protocol;
using System.Text.Json; // Make sure this namespace is included

[ApiController]
[Route("api/[controller]")]
public class EmailController : ControllerBase, IEmailSender
{
    private readonly IConfiguration _configuration;

    public EmailController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    // Removed HTTP method attribute from this method.
    // This is now a helper method used internally in the controller, not exposed via HTTP.
    [ApiExplorerSettings(IgnoreApi = true)]
    public async Task SendEmailAsync(string email, string subject, string message)
    {
        Console.WriteLine(subject);
        Console.WriteLine(message);
        var client_email = "";
        var environment = _configuration["Environment"];
        if (environment == "Development")
        {
            var EMAIL_FRONTEND_DEV = Environment.GetEnvironmentVariable("EMAIL_FRONTEND_DEV");
            if (EMAIL_FRONTEND_DEV != null) { client_email = EMAIL_FRONTEND_DEV; };
        } else if (environment == "Production")
        {
            var EMAIL_FRONTEND_PROD = Environment.GetEnvironmentVariable("EMAIL_FRONTEND_PROD");
            if (EMAIL_FRONTEND_PROD != null) { client_email = EMAIL_FRONTEND_PROD; };

        }
        Console.WriteLine($"Current Environment: {environment}");

        Console.WriteLine($"client email: {client_email}");

        try
        {
            var emailSettings = _configuration.GetSection("EmailSettings").Get<EmailSettings>();




            if (emailSettings == null)
            {
                throw new Exception($"Error sending email");
            }

            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(emailSettings.SenderName, emailSettings.SenderEmail));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            //emailMessage.Body = new TextPart("html") { Text = message };
            var resetLink = $"{_configuration["FrontendBaseUrl"]}/resetPassword?code={message}"; // "message" is the reset code
            var htmlBody = string.Empty;

            if (subject.Contains("Reset")) // forgotPassword endpoint
            {
                // Password reset link
                
                htmlBody = $@"
                    <p>Please reset your password using the following link:</p>
                    <a href='{_configuration["FrontendBaseUrl"]}/resetPassword?code={message}'>Reset Password</a>
                    <p>If you did not request a password reset, please ignore this email.</p>";
            }
            else if (subject.Contains("Confirm")) // rescendConfirmation endpoint
            {
                var redirectedMessage = "";
                if (environment == "Production")
                {
                    Console.WriteLine("Email Production");
                     redirectedMessage = message.Replace("http://localhost", client_email);
                    Console.WriteLine(redirectedMessage);

                }
                else
                {
                    Console.WriteLine("Email Dev");
                    redirectedMessage = message.Replace("http://localhost:5001", client_email);
                    Console.WriteLine(redirectedMessage);

                }
                Console.WriteLine(redirectedMessage);
                Console.WriteLine(message);
                htmlBody = $@"
                    <p>{redirectedMessage}</p>
                    <p>If you did not request this, please ignore this email.</p>";

                /*
                // Email confirmation link
                htmlBody = $@"
                <p>Please confirm your email address by clicking the following link:</p>
                <a href='{_configuration["localhost:5001"]}/confirmEmail?code={Uri.EscapeDataString(message)}'>Confirm Email</a>
                <p>If you did not request this, please ignore this email.</p>";
                */
            }
            else if (subject.Contains("Purchase")) // rescendConfirmation endpoint
            {
                
                htmlBody = $@"
                    <p>{message}</p>
                    <p>If you did not request this, please ignore this email.</p>";

                /*
                // Email confirmation link
                htmlBody = $@"
                <p>Please confirm your email address by clicking the following link:</p>
                <a href='{_configuration["localhost:5001"]}/confirmEmail?code={Uri.EscapeDataString(message)}'>Confirm Email</a>
                <p>If you did not request this, please ignore this email.</p>";
                */
            }
            else
            {
                // Default fallback message
                htmlBody = "<p>Thank you for your request.</p>";
            }

            /*
            var htmlBody = $@"
            <p>Please reset your password using the following link:</p>
            <a href='{resetLink}'>Reset Password</a>
            <p>If you did not request a password reset, please ignore this email.</p>";
            */
            emailMessage.Body = new TextPart("html") { Text = htmlBody };


            using var smtpClient = new SmtpClient();
            await smtpClient.ConnectAsync(emailSettings.SmtpServer, emailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
            await smtpClient.AuthenticateAsync(emailSettings.SenderEmail, emailSettings.Password);
            await smtpClient.SendAsync(emailMessage);
            await smtpClient.DisconnectAsync(true);


        }
        catch (Exception ex)
        {
            throw new Exception($"Error sending email: {ex.Message}");
        }
    }
    [ApiExplorerSettings(IgnoreApi = true)]
    public async Task SendOrderSucceededEmail(Tickets tickets, string customerEmail)
    {
        Console.WriteLine(tickets);
        Console.WriteLine(customerEmail);
        var ticketsJson = JsonSerializer.Serialize(tickets); // This should return a string
        Console.WriteLine(ticketsJson);
        var seatReservation = tickets.Seat == 0 ? "Ei varattu" : tickets.Seat.ToString();

        var htmlContent = $@"
                <html>
                    <body>
                        <h1 >Kiitos tilauksestasi! </h1>
                        <p>Matkalippusi tiedot.</p>
                        <table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse; width: 50%;'>
                            <thead>
                                <tr>
                                    <th style='background-color:#f2f2f2;'>Päivämäärä</th>
                                    <th style='background-color: #f2f2f2;'>Lähtöaika</th>
                                    <th style='background-color: #f2f2f2;'>Lähtöpaikka</th>
                                    <th style='background-color: #f2f2f2;'>Saapumisaika</th>
                                    <th style='background-color: #f2f2f2;'>Saapumispaikka</th>
                                    <th style='background-color: #f2f2f2;'>Istumapaikka</th>
                                    <th style='background-color: #f2f2f2;'>Sähköposti</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{tickets.Date}</td>
                                    <td>{tickets.StartTime}</td>
                                    <td>{tickets.Departure}</td>
                                    <td>{tickets.EndTime}</td>
                                    <td>{tickets.Destination}</td>
                                    <td>{seatReservation}</td>
                                    <td>{tickets.Name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </body>
                </html>";
        try
        {
            // Call SendEmailAsync to send the email
            await SendEmailAsync(customerEmail, "Purchase succeeded", htmlContent);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error sending email: {ex.Message}");

        }
    }

    // This is the HTTP POST endpoint, decorated with [HttpPost("send")].
    [HttpPost("send")]
    public async Task<IActionResult> SendEmail([FromBody] EmailRequest request)
    {
        Console.WriteLine("test");

        try
        {
            // Call SendEmailAsync to send the email
            await SendEmailAsync(request.RecipientEmail, request.Subject, request.Body);
            return Ok("Email sent successfully.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error sending email: {ex.Message}");
        }
    }
}