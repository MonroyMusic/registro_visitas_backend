using registro_visitas_backend.Dtos;
using registro_visitas_backend.Dtos.Place;

namespace registro_visitas_backend.Services.Interfaces
{
    public interface IPlaceService
    {
        Task<ResponseDto<PlaceDto>> CreateAsync(CreatePlaceDto dto);
        Task<ResponseDto<PlaceDto>> DeleteAsync(Guid id);
        Task<ResponseDto<List<PlaceDto>>> GetListAsync(string search = "");
    }
}
