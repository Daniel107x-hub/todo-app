using backend.Data;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<TodoDbContext>();
builder.Services.AddSwaggerGen(options => options.SwaggerDoc("v1", new OpenApiInfo()
{
    Title = "Todo",
    Description = "An API for managing todos",
    Version = "1.0"
}));

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseHttpsRedirection();
}


app.Run();
