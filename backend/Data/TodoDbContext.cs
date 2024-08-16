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
}