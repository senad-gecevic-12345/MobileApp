using MediatR;
using MobileAppApi.Models;
namespace MobileAppApi.Requests
{
    namespace CoffeeRequest
    {
        public record GetCoffeeIdRequest(int id) : IRequest<Coffee>;
        public record GetCoffeeListRequest : IRequest<List<Coffee>>;
    }
}
