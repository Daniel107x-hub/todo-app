# Backend setup and running
https://www.npgsql.org/efcore/
https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-8.0&source=recommendations&tabs=visual-studio-code
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

## Creating the controllers
1. Create a controller
```csharp
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TodoController : ControllerBase
{
    private readonly TodoDbContext _context;
    
    public TodoController(TodoDbContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public async Task<IEnumerable<Todo>> GetTodos()
    {
        return await _context.Todos.ToListAsync();
    }
}

```
2. Add the swagger config and map the controllers in Program.cs
```csharp
using backend.Data;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddRouting(option => option.LowercaseUrls = true);
builder.Services.AddDbContext<TodoDbContext>();
builder.Services.AddSwaggerGen(options => options.SwaggerDoc("v1", new OpenApiInfo()
{
    Title = "Todo",
    Description = "An API for managing todos",
    Version = "1.0"
}));
// builder.Services.AddRouting(option => option.LowercaseUrls = true);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
    app.UseCors();
}
else
{
    app.UseHttpsRedirection();
}

app.MapControllers();

app.Run();

```