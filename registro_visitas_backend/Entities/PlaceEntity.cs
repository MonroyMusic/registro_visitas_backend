using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace registro_visitas_backend.Entities
{

    [Table("places", Schema = "principal")]
    public class PlaceEntity
    {

        [Column("id")]
        [Key]
        public Guid Id { get; set; }

        [Column("place_name")]
        [Required]
        [StringLength(100)]
        public string PlaceName { get; set; }

        [Column("description")]
        [Required]
        [StringLength(250)]
        public string Description { get; set; }

        [Column("rating")]
        [Required]
        public string Rating { get; set; }

        [Column("coords")]
        [Required]
        [StringLength(200)]
        public string Coords { get; set; }

        [Column("user_id")]
        public string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public virtual UserEntity User { get; set; }

    }
}
