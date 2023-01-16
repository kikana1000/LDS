using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LDS2223.Models
{
    public class Machine
    {

        public int ID { get; set; }

        public string name { get; set; }

        public int establishmentID { get; set; }

        public bool isActive {get;set;}
    
        public int aquisitionYear { get; set; }

        public string functionMachine { get; set; }
    }
}
