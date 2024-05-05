using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using registro_visitas_backend.Dtos;
using registro_visitas_backend.Dtos.Place;
using registro_visitas_backend.Services.Interfaces;

namespace registro_visitas_backend.Controllers
{
    [Route("api/place")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class PlaceController : ControllerBase
    {
        private readonly IPlaceService _placeService;

        public PlaceController(IPlaceService placeService)
        {

            _placeService = placeService;

        }

        [HttpGet]
        public async Task<ActionResult<List<PlaceDto>>> GetAll(string seacrh = "")
        {

            var placeResponse = await _placeService.GetListAsync(seacrh);

            return StatusCode(placeResponse.StatusCode, placeResponse);

        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CreatePlaceDto model)
        {

            var placeResponse = await _placeService.CreateAsync(model);

            return StatusCode(placeResponse.StatusCode, placeResponse);

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ResponseDto<PlaceDto>>> Delete(Guid id)
        {

            var placeResponse = await _placeService.DeleteAsync(id);

            return StatusCode(placeResponse.StatusCode, placeResponse);

        }

    }
}
