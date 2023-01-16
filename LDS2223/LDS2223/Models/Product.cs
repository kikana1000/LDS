using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LDS2223.Models
{
    public class Product
    {
        public int ID { get; set; }

        public string reference { get; set; }

        public string name { get; set; }

        public string description { get; set; }

        public int stateID { get; set; }

        public int productionBatchID { get; set; }
    }
}
