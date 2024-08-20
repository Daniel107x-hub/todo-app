using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public class TodoDbContext : DbContext
{
    private IConfiguration _configuration;
    public TodoDbContext(IConfiguration configuration)
    {
        this._configuration = configuration;
    } 
    public DbSet<Todo> Todos { get; set; }
    public DbSet<User> Users { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasMany(e => e.Todos)
            .WithOne(e => e.User)
            .HasForeignKey(e => e.UserEmail)
            .HasPrincipalKey(e => e.Email)
            .OnDelete(DeleteBehavior.Cascade);
    }
}