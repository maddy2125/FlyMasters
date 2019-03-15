using System;
using System.Collections.Generic;

namespace FlyMasters.Business.Models
{
    public partial class tblProfileNote
    {
        public int NotesId { get; set; }
        public int ProfileId { get; set; }
        public string Description { get; set; }
        public Nullable<int> AddedBy { get; set; }
        public Nullable<System.DateTime> AddedOn { get; set; }
        public virtual tblProfile tblProfile { get; set; }

        public virtual tblUser tblUser { get; set; }
    }
}
