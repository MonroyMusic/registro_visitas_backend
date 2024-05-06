using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Internal;
using registro_visitas_backend.Database;
using registro_visitas_backend.Dtos;
using registro_visitas_backend.Dtos.Place;
using registro_visitas_backend.Dtos.Register;
using registro_visitas_backend.Entities;
using registro_visitas_backend.Services.Interfaces;

namespace registro_visitas_backend.Services
{
    public class RegisterService : IRegisterService
    {
        private readonly PlaceRegisterDbContext _context;
        private readonly IMapper _mapper;
        private readonly HttpContext _httpContext;
        private readonly UserManager<UserEntity> _userManager;
        private readonly SignInManager<UserEntity> _signInManager;

        public RegisterService(UserManager<UserEntity> userManager,
            SignInManager<UserEntity> signInManager, IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
        }

        public async Task<ResponseDto<RegisterDto>> CreateAsync(CreateRegisterDto dto)
        {

            var user = new UserEntity
            {

                UserName = dto.UserName,
                Email = dto.Email

            };

            var result = await _userManager.CreateAsync(user, dto.Password);

            if (result.Succeeded)
            {

                var registerDto = _mapper.Map<RegisterDto>(user);

                return new ResponseDto<RegisterDto>
                {
                    Status = true,
                    StatusCode = 201,
                    Message = "Usuario Creado Correctamente",
                    Data = registerDto
                };
            }
            else
            {
                return new ResponseDto<RegisterDto>
                {
                    Status = false,
                    StatusCode = 400,
                    Message = String.Join("; ", result.Errors.Select(e => e.Description)),
                    Data = null
                };
            }

        }

    }
}
