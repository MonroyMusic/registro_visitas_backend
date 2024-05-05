using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using registro_visitas_backend.Dtos;
using registro_visitas_backend.Dtos.Security;
using registro_visitas_backend.Services.Interfaces;

namespace placeregister_backend.Controllers
{

    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {

            _authService = authService;

        }

        [HttpPost("login")]
        public async Task<ActionResult<ResponseDto<LoginResponseDto>>> Login(LoginDto dto)
        {

            var authResponse = await _authService.LoginAsync(dto);

            return StatusCode(authResponse.StatusCode, authResponse);

        }

        [HttpPost("refresh-token")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<ResponseDto<LoginResponseDto>>> RefreshToken()
        {

            var authResponse = await _authService.RefreshTokenAsync();

            return StatusCode(authResponse.StatusCode, authResponse);

        }

    }
}
