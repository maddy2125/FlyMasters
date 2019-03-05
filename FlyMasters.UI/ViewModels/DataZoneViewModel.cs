using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FlyMasters.UI.ViewModels
{
    public class DataZoneViewModel
    {
        [Display(Name = "Profle ID")]
        public int ProfileID { get; set; }

        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Status { get; set; }

        public int? StatusID { get; set; }

        [Display(Name = "Created On")]
        public DateTime CreateDate { get; set; }

        public string Source { get; set; }


    }
}