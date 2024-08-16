using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Data;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using backend.Models;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly TodoDbContext _context;

    public AuthController(IConfiguration configuration, TodoDbContext context)
    {
        _configuration = configuration;
        _context = context;
    }

    [HttpPost("google")]
    public async Task<IActionResult> GoogleLogin([FromBody] GoogleTokenRequest request)
    {
        var payload = await GoogleJsonWebSignature.ValidateAsync(request.Token);
        // Create or update the user in your database here
        // 1. Check if the user exists in the database
        User? user;
        try
        {
            user = await _context.Users.FindAsync(payload.Email);
            if (user == null)
            {
                user = new User()
                {
                    email = payload.Email,
                    firstName = payload.GivenName,
                    lastName = payload.FamilyName,
                    picture = payload.Picture
                };
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, payload.Subject),
            new Claim(JwtRegisteredClaimNames.Email, payload.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds);
        var response = new
        {
            user,
            token = new JwtSecurityTokenHandler().WriteToken(token)
        };
        return Ok(response);
    }
}

public class GoogleTokenRequest
{
    public string? Token { get; set; }
}
