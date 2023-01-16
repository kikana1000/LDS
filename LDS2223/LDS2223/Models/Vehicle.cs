using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LDS2223.Models
{
    public class Vehicle
    {
        public int ID { get; set; }

        public string description { get; set; }

        public string licensePlate { get; set; }

        public bool isActive { get; set; }
    }
}
