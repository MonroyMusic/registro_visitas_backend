using Microsoft.AspNetCore.Identity;
using registro_visitas_backend;
using registro_visitas_backend.Database;
using registro_visitas_backend.Entities;

var builder = WebApplication.CreateBuilder(args);

var startup = new Startup(builder.Configuration);

startup.ConfigureServices(builder.Services);

var app = builder.Build();

startup.Configure(app, app.Environment);

using (var scope = app.Services.CreateScope())
{

    var service = scope.ServiceProvider;

    var loggerfactory = service.GetRequiredService<ILoggerFactory>();

    try
    {

        var userManager = service.GetRequiredService<UserManager<UserEntity>>();

        var roleManager = service.GetRequiredService<RoleManager<IdentityRole>>();

        await DbSeeder.LoadDataAsync(userManager, roleManager, loggerfactory);

    }
    catch (Exception e)
    {

        var logger = loggerfactory.CreateLogger<Program>();

        logger.LogError(e, "Error al inicializar Datos");

    }

}

app.Run();
