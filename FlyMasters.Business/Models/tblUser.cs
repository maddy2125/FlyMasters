using System;
using System.Collections.Generic;

namespace FlyMasters.Business.Models
{
    public partial class tblUser
    {
        public tblUser()
        {
            this.tblLeads = new List<tblLead>();
            this.tblLeads1 = new List<tblLead>();
            this.tblProfiles = new List<tblProfile>();
            this.tblUserPrivileges = new List<tblUserPrivilege>();
        }

        public int UserID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public virtual ICollection<tblLead> tblLeads { get; set; }
        public virtual ICollection<tblLead> tblLeads1 { get; set; }
        public virtual ICollection<tblProfile> tblProfiles { get; set; }
        public virtual ICollection<tblUserPrivilege> tblUserPrivileges { get; set; }
    }
}
