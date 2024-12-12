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
        
        try
        {
            var emailSettings = _configuration.GetSection("EmailSettings").Get<EmailSettings>();

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
        try
        {
            // Call SendEmailAsync to send the email
            await SendEmailAsync(customerEmail, "Purchase succeeded", ticketsJson);
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