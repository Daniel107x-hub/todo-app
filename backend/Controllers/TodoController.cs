using System.Security.Claims;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
    public async Task<ActionResult<IEnumerable<TodoDto>>> GetTodos()
    {
        var email = User.FindFirstValue(ClaimTypes.Email);
        var user = await _context.Users.Where(user => user.Email == email).FirstAsync();
        var todos  = await _context.Todos.Where(todo => todo.UserEmail == user.Email).ToListAsync();
        return todos.Select(todo => new TodoDto()
        {
            Id = todo.Id,
            Title = todo.Title,
            Description = todo.Description,
            Completed = todo.Completed
        }).ToList();
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<TodoDto>> GetTodo(int id)
    {
        var email = User.FindFirstValue(ClaimTypes.Email);
        var user = await _context.Users.Where(user => user.Email == email).FirstAsync();
        var todos = await _context.Todos.Where(todo => todo.UserEmail == user.Email && todo.Id == id).ToListAsync();
        if(todos.Count == 0)
        {
            return NotFound();
        }
        return todos.Select(todo => new TodoDto()
        {
            Id = todo.Id,
            Title = todo.Title,
            Description = todo.Description,
            Completed = todo.Completed
        }).First();
    }
    
    [HttpPost]
    public async Task<ActionResult<Todo>> PostTodo(Todo todo)
    {
        var email = User.FindFirstValue(ClaimTypes.Email);
        var user = await _context.Users.Where(user => user.Email == email).FirstOrDefaultAsync();
        if (user == null) return Unauthorized();
        todo.UserEmail = user.Email;
        _context.Todos.Add(todo);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetTodo", new { id = todo.Id }, todo);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTodo(int id)
    {
        var todo = await _context.Todos.FindAsync(id);
        if (todo == null) return NotFound();
        _context.Todos.Remove(todo);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TodoDto>> UpdateTodo([FromRoute]int id, [FromBody] Todo todo)
    {
        var email = User.FindFirstValue(ClaimTypes.Email);
        var foundTodo  = await _context.Todos.FindAsync(id);
        if (foundTodo == null || foundTodo.UserEmail == null) return NotFound();
        if (!foundTodo.UserEmail.Equals(email)) return NotFound();
        foundTodo.Title = todo.Title;
        foundTodo.Description = todo.Description;
        foundTodo.Completed = todo.Completed;
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
