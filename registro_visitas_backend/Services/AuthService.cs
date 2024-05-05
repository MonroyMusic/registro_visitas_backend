using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using registro_visitas_backend.Dtos;
using registro_visitas_backend.Dtos.Security;
using registro_visitas_backend.Entities;
using registro_visitas_backend.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace registro_visitas_backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly SignInManager<UserEntity> _signInManager;
        private readonly UserManager<UserEntity> _userManager;
        private readonly IConfiguration _configuration;
        private readonly HttpContext _httpContext;
        private readonly string _USER_ID;

        public AuthService(SignInManager<UserEntity> signInManager,
            UserManager<UserEntity> userManager,
            IConfiguration configuration,
            IHttpContextAccessor httpContextAccesor)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _configuration = configuration;
            _httpContext = httpContextAccesor.HttpContext;
            var idClaim = _httpContext.User.Claims.Where(x => x.Type == "UserId").FirstOrDefault();
            _USER_ID = idClaim?.Value;
        }


        public async Task<ResponseDto<LoginResponseDto>> LoginAsync(LoginDto dto)
        {

            var result = await _signInManager.PasswordSignInAsync(
                dto.UserName,
                dto.Passoword,
                isPersistent: false,
                lockoutOnFailure: false
            );

            if (result.Succeeded)
            {

                var userEntity = await _userManager.FindByNameAsync(dto.UserName);

                var authClaims = new List<Claim>
                {

                    new Claim(ClaimTypes.Name, userEntity.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("UserId", userEntity.Id)

                };

                var userRoles = await _userManager.GetRolesAsync(userEntity);

                foreach (var role in userRoles)
                {

                    authClaims.Add(new Claim(ClaimTypes.Role, role));

                }

                var jwtToken = GetToken(authClaims);

                return new ResponseDto<LoginResponseDto>
                {

                    StatusCode = 200,
                    Status = true,
                    Message = "Inicio de Sesión realizado satisfactoriamente",
                    Data = new LoginResponseDto
                    {

                        Email = dto.UserName,
                        Token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
                        TokenExpiration = jwtToken.ValidTo,
                    }

                };

            }

            return new ResponseDto<LoginResponseDto>
            {

                StatusCode = 400,
                Status = false,
                Message = "Fallo el inicio de Sesión"

            };

        }

        public async Task<ResponseDto<LoginResponseDto>> RefreshTokenAsync()
        {

            var userEntity = await _userManager.FindByIdAsync(_USER_ID);

            var authClaims = new List<Claim>
                {

                    new Claim(ClaimTypes.Email, userEntity.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("UserId", userEntity.Id)

                };

            var userRoles = await _userManager.GetRolesAsync(userEntity);

            foreach (var role in userRoles)
            {

                authClaims.Add(new Claim(ClaimTypes.Role, role));

            }

            var jwtToken = GetToken(authClaims);

            return new ResponseDto<LoginResponseDto>
            {

                StatusCode = 200,
                Status = true,
                Message = "Token Actualizado satisfactoriamente",
                Data = new LoginResponseDto
                {

                    Email = userEntity.Email,
                    Token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
                    TokenExpiration = jwtToken.ValidTo,
                }

            };

        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {

            var authSigninKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));

            var token = new JwtSecurityToken(

                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256)

            );

            return token;

        }

    }
}
