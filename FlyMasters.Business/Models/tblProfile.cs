using System;
using System.Collections.Generic;

namespace FlyMasters.Business.Models
{
    public partial class tblProfile
    {
        public tblProfile()
        {
            this.tblLeads = new List<tblLead>();
        }

        public int ProfileID { get; set; }
        public Nullable<int> ImportID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public Nullable<int> Status { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public virtual tblImport tblImport { get; set; }
        public virtual ICollection<tblLead> tblLeads { get; set; }
        public virtual tblUser tblUser { get; set; }

        public virtual tblStatus tblStatus { get; set; }
    }
}
