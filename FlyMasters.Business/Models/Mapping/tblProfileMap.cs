using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace FlyMasters.Business.Models.Mapping
{
    public class tblProfileMap : EntityTypeConfiguration<tblProfile>
    {
        public tblProfileMap()
        {
            // Primary Key
            this.HasKey(t => t.ProfileID);

            // Properties
            this.Property(t => t.FirstName)
                .HasMaxLength(50);

            this.Property(t => t.LastName)
                .HasMaxLength(50);

            this.Property(t => t.Phone)
                .HasMaxLength(15);

            this.Property(t => t.Email)
                .HasMaxLength(100);

            // Table & Column Mappings
            this.ToTable("tblProfile");
            this.Property(t => t.ProfileID).HasColumnName("ProfileID");
            this.Property(t => t.ImportID).HasColumnName("ImportID");
            this.Property(t => t.FirstName).HasColumnName("FirstName");
            this.Property(t => t.LastName).HasColumnName("LastName");
            this.Property(t => t.Phone).HasColumnName("Phone");
            this.Property(t => t.Email).HasColumnName("Email");
            this.Property(t => t.Status).HasColumnName("Status");
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
            this.Property(t => t.CreateDate).HasColumnName("CreateDate");
            this.Property(t => t.UpdateDate).HasColumnName("UpdateDate");

            // Relationships
            this.HasOptional(t => t.tblImport)
                .WithMany(t => t.tblProfiles)
                .HasForeignKey(d => d.ImportID);
            this.HasOptional(t => t.tblStatus)
                .WithMany(t => t.tblProfiles)
                .HasForeignKey(d => d.Status);
            this.HasOptional(t => t.tblUser)
                .WithMany(t => t.tblProfiles)
                .HasForeignKey(d => d.CreatedBy);

        }
    }
}
