using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LDS2223.Models
{
    public class Phase
    {
        public int ID { get; set; }

        public string name { get; set; }

        public string jsonStructure { get; set; }

        public string nextPhasesProduct { get; set; }

        public string nextPhasesProductionBatch { get; set; }

        public string nextPhasesMaterial { get; set; }



    }
}
