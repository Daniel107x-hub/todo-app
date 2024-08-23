namespace backend.Models;

public class Todo
{
    public int Id { get; set; }
    public string Title { get; set; }   
    public string Description { get; set; }
    public bool Completed { get; set; }
    /**
     * On simple relations like one to many, only having the parent and child annotations
     * in the model itself is enough, however, for more complex relationships, we can customize
     * those using the OnModelCreating method in the DBContext class
     * https://learn.microsoft.com/en-us/ef/core/modeling/relationships
     */
    public string? UserEmail { get; set; } // PK of the parent entity
    public User? User { get; } // Parent entity
}