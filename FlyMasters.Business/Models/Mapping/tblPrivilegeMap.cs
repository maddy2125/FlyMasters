using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace FlyMasters.Business.Models.Mapping
{
    public class tblPrivilegeMap : EntityTypeConfiguration<tblPrivilege>
    {
        public tblPrivilegeMap()
        {
            // Primary Key
            this.HasKey(t => t.PrivilegeID);

            // Properties
            this.Property(t => t.PrivilegeName)
                .HasMaxLength(50);

            this.Property(t => t.Description)
                .HasMaxLength(500);

            // Table & Column Mappings
            this.ToTable("tblPrivileges");
            this.Property(t => t.PrivilegeID).HasColumnName("PrivilegeID");
            this.Property(t => t.PrivilegeName).HasColumnName("PrivilegeName");
            this.Property(t => t.Description).HasColumnName("Description");
            this.Property(t => t.CreateDate).HasColumnName("CreateDate");
        }
    }
}
