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
