using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Minio;
using Minio.DataModel.Args;
using System;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Util;
using System.Security.Claims;
using TicketReservationApp.Repositories;
using TicketReservationApp.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace TicketReservationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MinioController : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;
        private readonly IUserRepository _UserRepository;

        public MinioController(IAmazonS3 s3Client, IUserRepository userRepository)
        {
            _s3Client = s3Client;
            _UserRepository = userRepository;

        }

        //[HttpGet("{bucketID}/{objectName}")]
        /*
        [HttpPost()]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task PostFile(IFormFile formFile)
        {
            var client = new AmazonS3Client();
            var bucketRequest = new PutBucketRequest() { BucketName = "test" };
            await client.PutBucketAsync(bucketRequest);

        }
        
    }*/
        [HttpGet("{id}")]
        public Task<IActionResult> GetPresignedUrlByKey(string id)
        {
            //var userId = User.Identity.IsAuthenticated ? User.FindFirstValue(ClaimTypes.NameIdentifier) : "anon";
            //var user = await _UserRepository.GetUserByID(userId);
            //Console.WriteLine(userId);
            //Console.WriteLine(user.ProfileImage);

            //Console.WriteLine(user);
            
            // Generate a presigned URL for the specified object
            var presignedUrlRequest = new GetPreSignedUrlRequest
            {
                BucketName = "test",
                //Key = user.ProfileImage,
                Key = id,
                Expires = DateTime.Now.AddMinutes(10) // URL expires in 10 minutes
            };
            Console.WriteLine(presignedUrlRequest);
            var url = _s3Client.GetPreSignedURL(presignedUrlRequest);
            Console.WriteLine(url);

            if (url.StartsWith("https://"))
            {
                url = url.Replace("https://", "http://");
                url = url.Replace("http://dev-minio:9000", "http://localhost:9000");

            }
            
            return Task.FromResult<IActionResult>(Ok(new { url }));
        }
        /*
        [HttpGet]
        [Route("{test}")]
        public async Task<IActionResult> GetPresignedUrlTest()
        {
            {
                // Define the specific file key you want to retrieve
                var fileKey = "todo.txt";

                try
                {
                    // Generate a presigned URL for the specified object
                    var presignedUrlRequest = new GetPreSignedUrlRequest
                    {
                        BucketName = "test", // Replace with your bucket name
                        Key = fileKey,       // Specify the file key
                        Expires = DateTime.Now.AddMinutes(10) // URL expires in 10 minutes
                    };

                    Console.WriteLine(presignedUrlRequest);

                    // Get the presigned URL
                    var url = _s3Client.GetPreSignedURL(presignedUrlRequest);

                    Console.WriteLine(url);

                    // Optionally replace https with http if required
                    if (url.StartsWith("https://"))
                    {
                        url = url.Replace("https://", "http://");
                    }

                    // Return the URL in the response
                    return Ok(new { url });
                }
                catch (Exception ex)
                {
                    // Log the exception and return an error response
                    Console.WriteLine($"Error generating presigned URL: {ex.Message}");
                    return StatusCode(500, new { error = "Unable to generate presigned URL." });
                }
            }        }
            */
        [HttpPost("upload/test")]
        public async Task<IActionResult> PostFileTest(IFormFile formFile)
        {

            if (formFile == null || formFile.Length == 0)
            {
                Console.WriteLine("empty formfile");
                return BadRequest("No file uploaded or file is empty.");
            }

            //Console.WriteLine(User.FindFirstValue(ClaimTypes.NameIdentifier));
            //Console.WriteLine(User.Identity);
            //Console.WriteLine(User.Identity.IsAuthenticated);
            //var userId = User.Identity.IsAuthenticated ? User.FindFirstValue(ClaimTypes.NameIdentifier) : "anon";
            //Console.WriteLine($"User ID: {userId}");

            var bucketExists = await AmazonS3Util.DoesS3BucketExistV2Async(_s3Client, "test");

            var uniqueFileName = Guid.NewGuid().ToString(); // Generates a unique UUID
            var fileExtension = Path.GetExtension(formFile.FileName);
            var uniqueFileWithExtension = $"{uniqueFileName}{fileExtension}";
            Console.WriteLine(uniqueFileWithExtension);

            var objectRequest = new PutObjectRequest()
            {
                BucketName = "test",
                //Key = $"{DateTime.Now}+{formFile.FileName}",
                //Key = $"{userId}{formFile.FileName}",
                Key = uniqueFileWithExtension,
                InputStream = formFile.OpenReadStream(),

            };
            var response = await _s3Client.PutObjectAsync(objectRequest);

            return Ok(response);

        }
        [HttpPost("upload")]
        public async Task<IActionResult> PostFile(IFormFile formFile)
        {

            if (formFile == null || formFile.Length == 0)
                {
                    Console.WriteLine("empty formfile");
                    return BadRequest("No file uploaded or file is empty.");
                }

            //Console.WriteLine(User.FindFirstValue(ClaimTypes.NameIdentifier));
            //Console.WriteLine(User.Identity);
            //Console.WriteLine(User.Identity.IsAuthenticated);
            var userId = User?.Identity?.IsAuthenticated == true ? User.FindFirstValue(ClaimTypes.NameIdentifier) : null;

            Console.WriteLine($"User ID: {userId}");

            var bucketExists = await AmazonS3Util.DoesS3BucketExistV2Async(_s3Client, "test");


            var uniqueFileName = Guid.NewGuid().ToString(); // Generates a unique UUID
            var fileExtension = Path.GetExtension(formFile.FileName);
            var uniqueFileWithExtension = $"{uniqueFileName}{fileExtension}";
            Console.WriteLine(uniqueFileWithExtension);

            var objectRequest = new PutObjectRequest()
            {
                BucketName = "test",
                Key = uniqueFileWithExtension,
                //Key = $"{DateTime.Now}+{formFile.FileName}",
                //Key = $"{userId}{formFile.FileName}",
                    InputStream = formFile.OpenReadStream(),

                };
            var response = await _s3Client.PutObjectAsync(objectRequest);

            if (userId != null)
            {
                var user = await _UserRepository.GetUserByID(userId);
                if (user != null)
                {
                    //user.ProfileImage = $"{userId}{formFile.FileName}";
                    user.ProfileImage = uniqueFileWithExtension;
                    Console.WriteLine($"user profileimage {user.ProfileImage}");

                    var newUser = await _UserRepository.UpdateUser(user);
                    return Ok(response);
                }
                return BadRequest();


            }
            else
            {
                return Ok(response);
            }


        }

    }
}