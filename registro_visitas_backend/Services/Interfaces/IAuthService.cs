using registro_visitas_backend.Dtos;
using registro_visitas_backend.Dtos.Security;

namespace registro_visitas_backend.Services.Interfaces
{
    public interface IAuthService
    {
        Task<ResponseDto<LoginResponseDto>> LoginAsync(LoginDto dto);
        Task<ResponseDto<LoginResponseDto>> RefreshTokenAsync();
    }
}
