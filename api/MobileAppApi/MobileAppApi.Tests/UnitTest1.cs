using MobileAppApi.Controllers;
using Xunit;
using MobileAppApi.Data;
using MobileAppApi.Models;
using System.Text.RegularExpressions;

namespace MobileAppApi.Tests
{
    public class UnitTest1
    {
        // unit test for buffer too
        // read json to list and reconvert back to json and compare
        // ignoring whitespaces
        [Fact]
        public void json_to_model_list_to_json_compare()
        {
            string json_file = json_coffee_list_location.json_coffee_list;
            List <Coffee> list = JsonParser<Coffee>.parse_json(json_file);
            string reconvert_json = JsonParser<Coffee>.model_list_to_json(list);
            string json = File.ReadAllText(json_file);
            string one = Regex.Replace(reconvert_json, @"\s", "");
            string two = Regex.Replace(json, @"\s", "");
            Assert.Equal(one, two);
        }
    }
}