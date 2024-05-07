using System.ComponentModel.DataAnnotations;

namespace registro_visitas_backend.Dtos.Place
{
    public class CreatePlaceDto
    {

        [Display(Name = "Nombre del Lugar")]
        [Required(ErrorMessage = "El {0} es requerido")]
        [StringLength(maximumLength: 250,
            MinimumLength = 10,
            ErrorMessage = "El {0} debe tener entre {2} a {1} caracteres")]
        public string PlaceName { get; set; }

        [Display(Name = "Descripcion")]
        [Required(ErrorMessage = "La {0} es requerida")]
        [StringLength(maximumLength: 250,
            MinimumLength = 10,
            ErrorMessage = "La {0} debe tener entre {2} a {1} caracteres")]
        public string Description { get; set; }

        [Display(Name = "Calificacion")]
        [Required(ErrorMessage = "La {0} es requerida")]
        public int Rating { get; set; }

        [Display(Name = "Coordenadas")]
        [Required(ErrorMessage = "La {0} son requeridas")]
        public string Latitude { get; set; }

        [Display(Name = "Coordenadas")]
        [Required(ErrorMessage = "La {0} son requeridas")]
        public string Longitude { get; set; }

    }

}
