using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class User
{
    [Key]
    [MaxLength(50)]
    public string Email { get; set; }
    [MaxLength(50)]
    public string? FirstName { get; set; }
    [MaxLength(50)]
    public string? LastName { get; set; }
    public string? Picture { get; set; }
    public DateOnly? DateOfBirth { get; set; }
    public ICollection<Todo> Todos { get; } // Child entity
}