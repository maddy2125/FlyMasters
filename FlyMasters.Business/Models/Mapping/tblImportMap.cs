using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace FlyMasters.Business.Models.Mapping
{
    public class tblImportMap : EntityTypeConfiguration<tblImport>
    {
        public tblImportMap()
        {
            // Primary Key
            this.HasKey(t => t.ImportID);

            // Properties
            // Table & Column Mappings
            this.ToTable("tblImport");
            this.Property(t => t.ImportID).HasColumnName("ImportID");
            this.Property(t => t.SourceID).HasColumnName("SourceID");
            this.Property(t => t.ImportedOn).HasColumnName("ImportedOn");
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
        }
    }
}
