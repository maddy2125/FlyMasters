using System;
using System.Collections.Generic;

namespace FlyMasters.Business.Models
{
    public partial class tblImport
    {
        public tblImport()
        {
            this.tblProfiles = new List<tblProfile>();
        }

        public int ImportID { get; set; }
        public Nullable<int> SourceID { get; set; }
        public Nullable<System.DateTime> ImportedOn { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public virtual ICollection<tblProfile> tblProfiles { get; set; }
    }
}
