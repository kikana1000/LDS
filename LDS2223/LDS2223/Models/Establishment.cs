using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LDS2223.Models
{
    public class Establishment
    {

        public int ID { get; set; }
        public string name { get; set; }
        public int typeID { get; set; }
        public string address { get; set; }
        public bool isActive { get; set; }
    }
}
