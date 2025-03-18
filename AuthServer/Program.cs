using TodoApi;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
app.Run("http://0.0.0.0:5000");
builder.Services.AddDbContext<ToDoDbContext>(options =>
options.UseMySql(builder.Configuration.GetConnectionString("ToDoDb"), 
    new MySqlServerVersion(new Version(8, 0, 41))));

builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

// cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("corsapp", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// לשנות שמות
// כל המשימות
app.MapGet("/", async (ToDoDbContext db) =>{
    
    return await db.Items.ToListAsync();
} );
// עדכון משימה
app.MapPut("/items/{id}", async (ToDoDbContext db,[FromBody]Item item, int id) => {
 // ID מציאת המשימה עי
    Item newItem = await db.Items.FirstOrDefaultAsync(item => item.Id == id);
    if (newItem != null)
    {
        // newItem.Iscomplete = item.Iscomplete; 
        newItem.IsComplete = item.IsComplete;
    }
    

    await db.SaveChangesAsync();
    return Results.Ok(item);
});

// מחיקת משימה
app.MapDelete("/delete/{id}", async (ToDoDbContext db, int id) => {
    if(await db.Items.FindAsync(id) is Item item){
        db.Items.Remove(item);
        await db.SaveChangesAsync();
    }
return Results.NoContent(); 
    
});
// הוספת משימה
app.MapPost("/post", async (HttpRequest request,ToDoDbContext db, Item item) =>
{
    var todoItem = new Item
    {
        Name= item.Name,
        IsComplete= item.IsComplete
    };

    db.Items.Add(todoItem);
    await db.SaveChangesAsync();

    return Results.Created($"/todoitems/{todoItem.Id}", todoItem);
});
        app.UseRouting();
        app.UseCors("corsapp");
        app.UseAuthorization();


app.MapControllers();
app.Run();
