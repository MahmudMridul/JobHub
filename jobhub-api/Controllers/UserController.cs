using jobhub_api.Db;
using jobhub_api.Models;
using jobhub_api.Models.DTOs;
using jobhub_api.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace jobhub_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private string? secretKey;
        private ApiResponse response;
        private readonly JobHubContext _db;

        public UserController(IConfiguration configuration, JobHubContext db) 
        {
            secretKey = configuration.GetValue<string>("JwtSettings:SecretKey");
            response = new ApiResponse();
            _db = db;
        }

        // GET: api/<UserController>
        [HttpPost("register")]
        public async Task<ActionResult<ApiResponse>> Register(UserRegistrationDTO user)
        {
            try
            {
                byte[] salt = PasswordUtil.GenerateSalt();
                string hashedPassword = PasswordUtil.HashPassword(user.Password, salt);

                Role? userRole = await _db.Roles.FirstOrDefaultAsync(role => role.Name == user.RoleName);

                if (userRole != null)
                {
                    User newUser = new User()
                    {
                        Name = user.Name,
                        Email = user.Email,
                        PasswordHash = hashedPassword,
                        Salt = salt,
                        Role = userRole,
                        RoleID = userRole.ID,
                    };
                    await _db.Users.AddAsync(newUser);
                    await _db.SaveChangesAsync();

                    response.IsSuccess = true;
                    response.Message = "User added successfully.";
                    response.StatusCode = HttpStatusCode.OK;
                    response.Data = newUser;
                    return Ok(response);
                }
                else
                {
                    response.IsError = true;
                    response.Message = "Invalid role given";
                    response.StatusCode = HttpStatusCode.BadRequest;
                    return BadRequest(response);
                }
            }
            catch (Exception e)
            {
                response.IsError = true;
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Message = e.Message;
                return BadRequest(response);
            }
        }

        

        

        [HttpPost("login")]
        public async Task<ActionResult<ApiResponse>> Login(string userName, string password)
        {
            string token = TokenUtil.GetToken(userName, secretKey);
            response.IsSuccess = true;
            response.Message = "Token generated";
            response.Data = token;
            response.StatusCode = HttpStatusCode.OK;
            return Ok(response);
        }

        
        

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UserController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
