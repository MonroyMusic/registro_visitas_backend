using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace registro_visitas_backend.Entities
{
    public class UserEntity : IdentityUser
    {

        [Column("first_name")]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Column("last_name")]
        [StringLength(50)]
        public string LastName { get; set; }

        public virtual IEnumerable<PlaceEntity> Places { get; set; }

    }
}
