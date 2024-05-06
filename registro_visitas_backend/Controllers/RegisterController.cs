using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using registro_visitas_backend.Dtos;
using registro_visitas_backend.Dtos.Register;
using registro_visitas_backend.Entities;
using registro_visitas_backend.Services.Interfaces;

namespace registro_visitas_backend.Controllers
{
    [Route("api/register")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IRegisterService _registerService;

        public RegisterController(IRegisterService registerService)
        {

            _registerService = registerService;
        
        }

        [HttpPost]
        public async Task<ActionResult<ResponseDto<UserEntity>>> Register([FromBody]CreateRegisterDto dto)
        {

            var registerResponse = await _registerService.CreateAsync(dto);

            return StatusCode(registerResponse.StatusCode, registerResponse);

        }

    }
}
