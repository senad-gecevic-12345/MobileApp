using MediatR;
using MobileAppApi.Models;

namespace MobileAppApi.Data
{
    namespace CoffeeHandler
    {
        using MobileAppApi.Requests.CoffeeRequest;
        public class GetCoffeeIdHandler : IRequestHandler<GetCoffeeIdRequest, Coffee>
        {
            public Task<Coffee> Handle(GetCoffeeIdRequest request, CancellationToken cancellationToken)
            {
                Coffee out_ = new();
                string json_file = json_coffee_list_location.json_coffee_list;
                if (!CoffeeBuffer.Instance.get_init())
                {
                    CoffeeBuffer.Instance.set_list(JsonParser<Coffee>.parse_json(json_file));
                }
                foreach(Coffee coffee in CoffeeBuffer.Instance.coffee_list)
                {
                    if (coffee.id == request.id)
                    {
                        out_ = coffee;
                        break;
                    }
                }
                return Task.FromResult(out_);
            }
        }
        public class GetCoffeeListHandler : IRequestHandler<GetCoffeeListRequest, List<Coffee>>
        {
            public Task<List<Coffee>> Handle(GetCoffeeListRequest request, CancellationToken cancellationToken)
            {
                string json_file = json_coffee_list_location.json_coffee_list;
                if (!CoffeeBuffer.Instance.get_init())
                {
                    CoffeeBuffer.Instance.set_list(JsonParser<Coffee>.parse_json(json_file));
                }
                return Task.FromResult(CoffeeBuffer.Instance.coffee_list);
            }
        }
    }

}
