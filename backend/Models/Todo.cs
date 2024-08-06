namespace backend.Models;

public class Todo
{
    public int id { get; set; }
    public string title { get; set; }   
    public string description { get; set; }
    public bool completed { get; set; }
}