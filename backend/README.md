# Backend setup and running
## Setting up the DB

1. Have the DB up and running
2. Add the db driver  (For postgres)
```shell
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```
3. Create the DB Context file
```csharp
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
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"));
    }
}
```
4. Add the connection string to the appsettings.json
5. Create the DB executing the migrations
```shell
dotnet tool install --global dotnet-ef
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet ef migrations add InitialCreate
dotnet ef database update
```