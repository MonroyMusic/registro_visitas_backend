using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using registro_visitas_backend.Entities;

namespace registro_visitas_backend.Database
{
    public class PlaceRegisterDbContext : IdentityDbContext<UserEntity>
    {

        public PlaceRegisterDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            base.OnModelCreating(builder);

            builder.HasDefaultSchema("security");

            builder.Entity<UserEntity>().ToTable("users");
            builder.Entity<IdentityRole>().ToTable("roles");
            builder.Entity<IdentityUserRole<string>>().ToTable("users_roles");
            builder.Entity<IdentityUserClaim<string>>().ToTable("users_claims");
            builder.Entity<IdentityUserLogin<string>>().ToTable("users_login");
            builder.Entity<IdentityRoleClaim<string>>().ToTable("roles_claims");
            builder.Entity<IdentityUserToken<string>>().ToTable("users_token");

        }

        public DbSet<PlaceEntity> Places { get; set; }

    }
}
