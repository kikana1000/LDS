using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LDS2223.Models
{
    public class Supplier
    {

        public int ID { get; set; }

        public string name { get; set; }

        public string description { get; set; }

        public string email { get; set; }

        public string phone { get; set; }

        public string address { get; set; }

        public bool isActive { get; set; }

    }
}
