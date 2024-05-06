using registro_visitas_backend.Dtos;
using registro_visitas_backend.Dtos.Register;
using registro_visitas_backend.Entities;

namespace registro_visitas_backend.Services.Interfaces
{
    public interface IRegisterService
    {
        Task<ResponseDto<RegisterDto>> CreateAsync(CreateRegisterDto dto);
    }
}
