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
        [HttpGet()]
        public async Task<IActionResult> GetPresignedUrl()
        {
            var userId = User.Identity.IsAuthenticated ? User.FindFirstValue(ClaimTypes.NameIdentifier) : "anon";
            var user = await _UserRepository.GetUserByID(userId);
            Console.WriteLine(userId);
            Console.WriteLine(user.ProfileImage);

            Console.WriteLine(user);
            
            // Generate a presigned URL for the specified object
            var presignedUrlRequest = new GetPreSignedUrlRequest
            {
                BucketName = "test",
                Key = user.ProfileImage,
                Expires = DateTime.Now.AddMinutes(10) // URL expires in 10 minutes
            };
            Console.WriteLine(presignedUrlRequest);
            var url = _s3Client.GetPreSignedURL(presignedUrlRequest);
            Console.WriteLine(url);

            if (url.StartsWith("https://"))
            {
                url = url.Replace("https://", "http://");
            }
            
            return Ok(new { url });
        }
        [HttpPost()]
        public async Task<IActionResult> PostFile(IFormFile formFile)
        {

            Console.WriteLine(User.FindFirstValue(ClaimTypes.NameIdentifier));
            Console.WriteLine(User.Identity);
            Console.WriteLine(User.Identity.IsAuthenticated);
            var userId = User.Identity.IsAuthenticated ? User.FindFirstValue(ClaimTypes.NameIdentifier) : "anon";

            var bucketExists = await AmazonS3Util.DoesS3BucketExistAsync(_s3Client, "test");

            var objectRequest = new PutObjectRequest()
            {
                BucketName = "test",
                //Key = $"{DateTime.Now}+{formFile.FileName}",
                Key = $"{userId}{formFile.FileName}",
                    InputStream = formFile.OpenReadStream(),

                };
            var response = await _s3Client.PutObjectAsync(objectRequest);

            var user = await _UserRepository.GetUserByID(userId);
            user.ProfileImage = $"{userId}{formFile.FileName}";


            var newUser = await _UserRepository.UpdateUser(user);    

            return Ok(response);
           
        }

    }
}