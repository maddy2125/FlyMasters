using System;
using System.Collections.Generic;

namespace FlyMasters.Business.Models
{
    public partial class tblPrivilege
    {
        public tblPrivilege()
        {
            this.tblUserPrivileges = new List<tblUserPrivilege>();
        }

        public int PrivilegeID { get; set; }
        public string PrivilegeName { get; set; }
        public string Description { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public virtual ICollection<tblUserPrivilege> tblUserPrivileges { get; set; }
    }
}
