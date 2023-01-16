using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LDS2223.Models
{
    public class ProductionBatch
    {
        public int ID { get; set; }

        public string reference { get; set; }

        public int stateID { get; set; }
    }
}
