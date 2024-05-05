using Microsoft.AspNetCore.Identity;
using registro_visitas_backend.Entities;

namespace registro_visitas_backend.Database
{
    public class DbSeeder
    {

        public static async Task LoadDataAsync(UserManager<UserEntity> userManager,
            RoleManager<IdentityRole> roleManager, ILoggerFactory loggerFactory)
        {

            try
            {

                if (!roleManager.Roles.Any())
                {

                    await roleManager.CreateAsync(new IdentityRole("USER"));

                    await roleManager.CreateAsync(new IdentityRole("ADMIN"));

                }

                if (!userManager.Users.Any())
                {

                    var userAdmin = new UserEntity
                    {

                        Email = "gmonroy@me.com",

                        UserName = "GMonroy"

                    };

                    await userManager.CreateAsync(userAdmin, "Temporal001*");

                    await userManager.AddToRoleAsync(userAdmin, "ADMIN");

                    var normalUser = new UserEntity
                    {

                        Email = "mperez@me.com",

                        UserName = "MPerez"

                    };

                    await userManager.CreateAsync(normalUser, "Temporal001*");

                    await userManager.AddToRoleAsync(normalUser, "USER");

                }

            }
            catch (Exception e)
            {

                var logger = loggerFactory.CreateLogger<PlaceRegisterDbContext>();

                logger.LogError(e.Message);

            }

        }

    }
}
