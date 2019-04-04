﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FlyMasters.API.ViewModels
{
    public class ProfileEditModel
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

        public string Notes { get; set; }

        public IList<ProfileNotesViewModel> profileNotesViewModel { get; set; }

        public int AssignedTo { get; set; }

        public int ModifyBy { get; set; }
    }
}