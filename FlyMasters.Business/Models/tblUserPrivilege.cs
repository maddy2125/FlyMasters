using System;
using System.Collections.Generic;

namespace FlyMasters.Business.Models
{
    public partial class tblUserPrivilege
    {
        public int UserPrivilegeID { get; set; }
        public int UserID { get; set; }
        public int PrivilegeID { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public virtual tblPrivilege tblPrivilege { get; set; }
        public virtual tblUser tblUser { get; set; }
    }
}
