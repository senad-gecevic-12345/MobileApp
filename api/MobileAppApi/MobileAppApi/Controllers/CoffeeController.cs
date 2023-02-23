using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MobileAppApi.Models;
using MediatR;
using MobileAppApi.Data;
using MobileAppApi.Requests;

namespace MobileAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoffeeController : ControllerBase
    {
        private readonly IMediator mediator;
        public CoffeeController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        
        [HttpGet()]
        [Route("/coffee-drinks/{id}")]
        public async Task<ActionResult<Coffee>> get_coffee_drink_by_id(string id){
            var result = await mediator.Send(new Requests.CoffeeRequest.GetCoffeeIdRequest(Int32.Parse(id)));
            return Ok(result);  
        }

        [HttpGet()]
        [Route("/coffee-drinks")]
        public async Task<ActionResult<IEnumerable<Coffee>>> get_coffee_drinks()
        {
            var result = await mediator.Send(new Requests.CoffeeRequest.GetCoffeeListRequest());
            return Ok(result);
        }
    }
}
