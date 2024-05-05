using AutoMapper;
using Microsoft.EntityFrameworkCore;
using registro_visitas_backend.Database;
using registro_visitas_backend.Dtos;
using registro_visitas_backend.Dtos.Place;
using registro_visitas_backend.Entities;
using registro_visitas_backend.Services.Interfaces;

namespace registro_visitas_backend.Services
{




    public class PlaceService : IPlaceService
    {
        private readonly PlaceRegisterDbContext _context;
        private readonly IMapper _mapper;
        private readonly HttpContext _httpContext;
        private readonly string _USER_ID;

        public PlaceService(PlaceRegisterDbContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {

            _context = context;
            _mapper = mapper;
            _httpContext = httpContextAccessor.HttpContext;

            var idClaim = _httpContext.User.Claims.Where(x => x.Type == "UserId").FirstOrDefault();

            _USER_ID = idClaim?.Value;

        }


        public async Task<ResponseDto<PlaceDto>> CreateAsync(CreatePlaceDto dto)
        {

            var place = _mapper.Map<PlaceEntity>(dto);

            place.UserId = _USER_ID;

            _context.Places.Add(place);

            await _context.SaveChangesAsync();

            var placeDto = _mapper.Map<PlaceDto>(place);

            return new ResponseDto<PlaceDto>
            {

                Status = true,
                StatusCode = 201,
                Message = "Tarea Creadda Correctamente",
                Data = placeDto

            };

        }

        public async Task<ResponseDto<List<PlaceDto>>> GetListAsync(string search = "")
        {

            var place = await _context.Places.
                Where(p => p.PlaceName.Contains(search) && p.UserId == _USER_ID).ToListAsync();

            var placeDto = _mapper.Map<List<PlaceDto>>(place);

            return new ResponseDto<List<PlaceDto>>
            {

                Status = true,
                StatusCode = 200,
                Message = "Datos Obtenidos correctamente",
                Data = placeDto

            };

        }

        public async Task<ResponseDto<PlaceDto>> DeleteAsync(Guid id)
        {

            var place = await _context.Places.FirstOrDefaultAsync(p => p.Id == id && p.UserId == _USER_ID);

            if(place is null)
            {

                return new ResponseDto<PlaceDto>
                {

                    StatusCode = 404,
                    Status = false,
                    Message = "Tarea no encontrada"

                };

            }

            _context.Remove(place);

            await _context.SaveChangesAsync();

            return new ResponseDto<PlaceDto>
            {

                StatusCode = 200,
                Status = true,
                Message = "Tarea Borrada con éxito"

            };


        }

    }

}
