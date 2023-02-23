using MobileAppApi.Models;
namespace MobileAppApi.Data
{
    public class CoffeeBuffer
    {
        private static CoffeeBuffer instance = null;
        private static readonly object padlock = new object();
        public List<Coffee> coffee_list;
        private bool coffee_init = false;
        public bool get_init()
        {
            return coffee_init;
        }
        public void set_list(List<Coffee> list)
        {
            coffee_list = list;
            coffee_init = true;
        }
        public static CoffeeBuffer Instance
        {
            get
            {
                lock (padlock)
                {
                    if(instance == null)
                    {
                        instance = new CoffeeBuffer();
                    }
                    return instance;
                }
            }
        }

    }
}
