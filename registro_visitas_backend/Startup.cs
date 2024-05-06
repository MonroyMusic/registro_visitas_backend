using Microsoft.AspNetCore.Identity;
using registro_visitas_backend.Database;
using registro_visitas_backend.Entities;
using registro_visitas_backend.Services.Interfaces;
using registro_visitas_backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace registro_visitas_backend
{
    public class Startup
    {

        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();

            //Db Context

            services.AddDbContext<PlaceRegisterDbContext>(options =>

                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            //Custom Services

            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IPlaceService, PlaceService>();
            services.AddTransient<IRegisterService, RegisterService>();

            //Automapper

            services.AddAutoMapper(typeof(Startup));

            //Cors

            services.AddCors(options =>
            {

                options.AddDefaultPolicy(builder =>
                {

                    builder.WithOrigins(Configuration["FrontendURL"])
                    .AllowAnyHeader()
                    .AllowAnyMethod();

                });

            });


            //Context Accesor

            services.AddHttpContextAccessor();

            //Identity

            services.AddIdentity<UserEntity, IdentityRole>(options =>
            {

                options.SignIn.RequireConfirmedAccount = false;

            }).AddEntityFrameworkStores<PlaceRegisterDbContext>().AddDefaultTokenProviders();

            //Authentication

            services.AddAuthentication(options =>
            {

                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(options =>
            {

                options.SaveToken = true;

                options.RequireHttpsMetadata = false;

                options.TokenValidationParameters = new TokenValidationParameters
                {

                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration["JWT:ValidAudience"],
                    ValidIssuer = Configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]))

                };

            });

            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if(env.IsDevelopment())
            {

                app.UseSwagger();
                app.UseSwaggerUI();

            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {

                endpoints.MapControllers();

            });

        }
        
    }

}
