using System.ComponentModel.DataAnnotations;

namespace registro_visitas_backend.Dtos.Security
{
    public class LoginDto
    {

        [Display(Name = "Usuario")]
        [Required(ErrorMessage = "El {0} es requerido")]
        public string UserName { get; set; }

        [Display(Name = "Contraseña")]
        [Required(ErrorMessage = "La {0} es requerido")]
        public string Passoword { get; set; }

    }
}
