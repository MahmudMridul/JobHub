using jobhub_api.Db;
using jobhub_api.Models;
using jobhub_api.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
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
                byte[] salt = GenerateSalt();
                string hashedPassword = HashPassword(user.Password, salt);

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

        private byte[] GenerateSalt(int size = 16)
        {
            byte[] salt = new byte[size];
            RandomNumberGenerator.Fill(salt);
            return salt;
        }

        private string HashPassword(string password, byte[] salt)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
                byte[] saltedPassword = new byte[salt.Length + passwordBytes.Length];

                Buffer.BlockCopy(passwordBytes, 0, saltedPassword, 0, passwordBytes.Length);
                Buffer.BlockCopy(salt, 0, saltedPassword, passwordBytes.Length, salt.Length);

                byte[] hashedBytes = sha256.ComputeHash(saltedPassword);

                byte[] hashedPasswordWithSalt = new byte[hashedBytes.Length + salt.Length];
                Buffer.BlockCopy(salt, 0, hashedPasswordWithSalt, 0, salt.Length);
                Buffer.BlockCopy(hashedBytes, 0, hashedPasswordWithSalt, salt.Length, hashedBytes.Length);

                return Convert.ToBase64String(hashedPasswordWithSalt);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<ApiResponse>> Login(string userName, string password)
        {
            string token = GetToken(userName);
            response.IsSuccess = true;
            response.Message = "Token generated";
            response.Data = token;
            response.StatusCode = HttpStatusCode.OK;
            return Ok(response);
        }

        private string GetToken(string userName)
        {
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(secretKey);
            SecurityTokenDescriptor descriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim(ClaimTypes.Name, userName)
                    }
                ),
                Expires = DateTime.UtcNow.AddMinutes(20),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            SecurityToken token = handler.CreateToken(descriptor);
            return handler.WriteToken(token);
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
