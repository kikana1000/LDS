using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LDS2223.Models
{
    public class PhaseRecord
    {
        public int ID { get; set; }

        public int phaseID { get; set; }
        public string jsonStructure { get; set; }

        public DateTime date { get; set; }
        public string hash { get; set; }

    }
}
