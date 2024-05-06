using AutoMapper;
using registro_visitas_backend.Dtos.Place;
using registro_visitas_backend.Dtos.Register;
using registro_visitas_backend.Entities;

namespace registro_visitas_backend.Helpers
{
    public class AutoMapperProfile : Profile
    {

        public AutoMapperProfile()
        {

            PlaceMaps();
            RegisterMap();

        }

        private void PlaceMaps()
        {

            CreateMap<PlaceEntity, PlaceDto>();

            CreateMap<CreatePlaceDto, PlaceEntity>();


        }

        private void RegisterMap()
        {

            CreateMap<CreateRegisterDto, UserEntity>();
            CreateMap<UserEntity, RegisterDto>();

        }

    }
}
