using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace FlyMasters.Business.Models.Mapping
{
    public class tblUserPrivilegeMap : EntityTypeConfiguration<tblUserPrivilege>
    {
        public tblUserPrivilegeMap()
        {
            // Primary Key
            this.HasKey(t => new { t.UserPrivilegeID, t.UserID, t.PrivilegeID });

            // Properties
            this.Property(t => t.UserPrivilegeID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            this.Property(t => t.UserID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.PrivilegeID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("tblUserPrivileges");
            this.Property(t => t.UserPrivilegeID).HasColumnName("UserPrivilegeID");
            this.Property(t => t.UserID).HasColumnName("UserID");
            this.Property(t => t.PrivilegeID).HasColumnName("PrivilegeID");
            this.Property(t => t.CreateDate).HasColumnName("CreateDate");

            // Relationships
            this.HasRequired(t => t.tblPrivilege)
                .WithMany(t => t.tblUserPrivileges)
                .HasForeignKey(d => d.PrivilegeID);
            this.HasRequired(t => t.tblUser)
                .WithMany(t => t.tblUserPrivileges)
                .HasForeignKey(d => d.UserID);

        }
    }
}
