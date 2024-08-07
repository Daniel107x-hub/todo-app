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
