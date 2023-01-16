using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LDS2223.Models
{
    public class Employee
    {
        public int ID { get; set; }

        public string name { get; set; }

        public string email { get; set; }

        public string phone { get; set; }

        public int nif { get; set; }

        public bool isActive { get; set; }

        public int roleID { get; set; }

        public string password { get; set; }
    }
}
