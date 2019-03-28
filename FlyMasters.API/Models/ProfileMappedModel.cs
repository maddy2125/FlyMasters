using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlyMasters.API.ViewModels
{
    public class ProfileMappedModel
    {
        public int UserId { get; set; }

        public int MappedUserId { get; set; }

        public int[] SelectedProfileIds { get; set; }
    }
}