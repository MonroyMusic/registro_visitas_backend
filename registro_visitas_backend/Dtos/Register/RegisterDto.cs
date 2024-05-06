using System.ComponentModel.DataAnnotations;

namespace registro_visitas_backend.Dtos.Register
{
    public class RegisterDto
    {

        [Display(Name = "Usuario")]
        [Required(ErrorMessage = "El {0} es requerido")]
        public string UserName { get; set; }

        [Display(Name = "Correo Electronico")]
        [Required(ErrorMessage = "El {0} es requerido")]
        public string Email { get; set; }

        [Display(Name = "Contraseña")]
        [Required(ErrorMessage = "La {0} es requerida")]
        public string Password { get; set; }

    }
}
