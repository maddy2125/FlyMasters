using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace FlyMasters.Business.Models.Mapping
{
    public class tblProfileNoteMap : EntityTypeConfiguration<tblProfileNote>
    {
        public tblProfileNoteMap()
        {
            // Primary Key
            this.HasKey(t => t.NotesId);

            // Properties
            this.Property(t => t.Description)
                .HasMaxLength(500);

            // Table & Column Mappings
            this.ToTable("tblProfileNotes");
            this.Property(t => t.NotesId).HasColumnName("NotesId");
            this.Property(t => t.ProfileId).HasColumnName("ProfileId");
            this.Property(t => t.Description).HasColumnName("Description");
            this.Property(t => t.AddedBy).HasColumnName("AddedBy");
            this.Property(t => t.AddedOn).HasColumnName("AddedOn");

            // Relationships
            this.HasRequired(t => t.tblProfile)
                .WithMany(t => t.tblProfileNotes)
                .HasForeignKey(d => d.ProfileId);
            this.HasOptional(t => t.tblUser)
                .WithMany(t => t.tblProfileNotes)
                .HasForeignKey(d => d.AddedBy);


        }
    }
}
