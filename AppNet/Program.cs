using AppNet.Infra.DataBase;
using AppNet.Infra.Repository;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<Context>();
builder.Services.AddSwaggerGen();
//services cors
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

//app cors
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("corsapp");

app.UseAuthorization();
app.MapControllers();

app.Run();