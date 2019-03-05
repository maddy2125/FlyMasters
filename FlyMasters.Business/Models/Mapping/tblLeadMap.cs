using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace FlyMasters.Business.Models.Mapping
{
    public class tblLeadMap : EntityTypeConfiguration<tblLead>
    {
        public tblLeadMap()
        {
            // Primary Key
            this.HasKey(t => new { t.LeadID, t.ProfileID, t.MappedUserID });

            // Properties
            this.Property(t => t.LeadID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            this.Property(t => t.ProfileID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.MappedUserID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("tblLeads");
            this.Property(t => t.LeadID).HasColumnName("LeadID");
            this.Property(t => t.ProfileID).HasColumnName("ProfileID");
            this.Property(t => t.MappedUserID).HasColumnName("MappedUserID");
            this.Property(t => t.IsActive).HasColumnName("IsActive");
            this.Property(t => t.CreateDate).HasColumnName("CreateDate");
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");

            // Relationships
            this.HasRequired(t => t.tblProfile)
                .WithMany(t => t.tblLeads)
                .HasForeignKey(d => d.ProfileID);
            this.HasOptional(t => t.tblUser)
                .WithMany(t => t.tblLeads)
                .HasForeignKey(d => d.CreatedBy);
            this.HasRequired(t => t.tblUser1)
                .WithMany(t => t.tblLeads1)
                .HasForeignKey(d => d.MappedUserID);

        }
    }
}
