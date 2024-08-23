namespace backend.Models;

public class UserDto
{
    public string Email { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Picture { get; set; }
    public DateOnly? DateOfBirth { get; set; }
}