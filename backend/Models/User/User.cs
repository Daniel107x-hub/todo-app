using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class User
{
    [Key]
    [MaxLength(50)]
    public string email { get; set; }
    [MaxLength(50)]
    public string? firstName { get; set; }
    [MaxLength(50)]
    public string? lastName { get; set; }
    public string? picture { get; set; }
    public DateOnly? dateOfBirth { get; set; }
}