using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace FlyMasters.Business.Models.Mapping
{
    public class tblSourceMap : EntityTypeConfiguration<tblSource>
    {
        public tblSourceMap()
        {
            // Primary Key
            this.HasKey(t => t.SourceId);

            // Properties
            this.Property(t => t.SourceName)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.Description)
                .IsRequired()
                .HasMaxLength(500);

            // Table & Column Mappings
            this.ToTable("tblSource");
            this.Property(t => t.SourceId).HasColumnName("SourceId");
            this.Property(t => t.SourceName).HasColumnName("SourceName");
            this.Property(t => t.Description).HasColumnName("Description");
            this.Property(t => t.IsActive).HasColumnName("IsActive");
            this.Property(t => t.CreateDate).HasColumnName("CreateDate");
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
        }
    }
}
