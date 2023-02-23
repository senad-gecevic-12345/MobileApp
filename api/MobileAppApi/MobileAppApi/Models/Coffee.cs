namespace MobileAppApi.Models
{
    public class Coffee
    {
        public class Assets
        {
            public class Large
            {
                public string uri { get; set; }
            }

            public class Thumbnail
            {
                public Large large { get; set; }
            }
            public class FullSize
            {
                public string uri { get; set; }
            }
            public class MasterImage
            {
                public string uri { get; set; }
            }
            public Thumbnail thumbnail { get; set; }   
            public FullSize fullSize { get; set; }
            public MasterImage masterImage { get; set; }
            public Assets(string thumbnail_large_uri, string thumbnail_fullsize_uri, string thumbnail_masterimage_uri)
            {
            }
        }
        public string name { get; set; }
        public string formCode { get; set; }
        public int displayOrder { get; set; }
        public string availability { get; set; }
        public Assets assets { get; set; }
        public List<string> sizes { get; set; }   
        public int id { get; set; }
        public string category { get; set; }
        public Coffee() { }
        public Coffee(string name, string formCode, int displayOrder, List<string> sizes, int id, string category,
            string thumbnail_large_uri, string thumbnail_fullsize_uri, string thumbnail_masterimage_uri)
        {
            this.name = name;
            this.formCode = formCode;
            this.displayOrder = displayOrder;
            this.sizes = sizes;
            this.id = id;
            this.category = category;
        }
    }
}
