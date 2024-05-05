namespace registro_visitas_backend.Dtos.Security
{
    public class LoginResponseDto
    {

        public string Email { get; set; }
        public string Token { get; set; }
        public DateTime TokenExpiration { get; set; }

    }
}
