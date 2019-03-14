using System;
using System.Collections.Generic;

namespace FlyMasters.Business.Models
{
    public partial class tblStatus
    {
        public tblStatus()
        {
            this.tblProfiles = new List<tblProfile>();
        }

        public int StatusID { get; set; }
        public string StatusName { get; set; }

        public virtual ICollection<tblProfile> tblProfiles { get; set; }
    }
}
