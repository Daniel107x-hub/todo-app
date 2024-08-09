using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class TodoController : ControllerBase
{
    private readonly TodoDbContext _context;
    
    public TodoController(TodoDbContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
    {
        return await _context.Todos.ToListAsync();
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Todo>> GetTodo(int id)
    {
        var todo = await _context.Todos.FindAsync(id);
        if(todo == null)
        {
            return NotFound();
        }
        return todo;
    }
    
    [HttpPost]
    public async Task<ActionResult<Todo>> PostTodo(Todo todo)
    {
        _context.Todos.Add(todo);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetTodo", new { id = todo.id }, todo);
    }
}
