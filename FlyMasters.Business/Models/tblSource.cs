using System;
using System.Collections.Generic;

namespace FlyMasters.Business.Models
{
    public partial class tblSource
    {
        public int SourceId { get; set; }
        public string SourceName { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
    }
}
