
using MobileAppApi.Models;
using System.Text.Json;
using System.Text.Json.Serialization;

using Newtonsoft.Json;

namespace MobileAppApi.Data
{

    
    public class JsonParser<T>
    {
        public static string model_list_to_json(List<T> models)
        {
            return JsonConvert.SerializeObject(models);
        }
        public static List<T> parse_json(string file) {
            List<T> list = new();
            using (StreamReader reader = new StreamReader(file)) {
                 list = JsonConvert.DeserializeObject<List<T>>(reader.ReadToEnd());
            }
            return list;
        }
    }

}

