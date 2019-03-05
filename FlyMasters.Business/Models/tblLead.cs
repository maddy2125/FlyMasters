using System;
using System.Collections.Generic;

namespace FlyMasters.Business.Models
{
    public partial class tblLead
    {
        public int LeadID { get; set; }
        public int ProfileID { get; set; }
        public int MappedUserID { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public virtual tblProfile tblProfile { get; set; }
        public virtual tblUser tblUser { get; set; }
        public virtual tblUser tblUser1 { get; set; }
    }
}
