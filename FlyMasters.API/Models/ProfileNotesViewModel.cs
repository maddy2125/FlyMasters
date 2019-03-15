using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlyMasters.API.ViewModels
{
    public class ProfileNotesViewModel
    {
        public string Comments { get; set; }

        public DateTime AddedOn { get; set; }

        public string AddedBy { get; set; }
    }
}