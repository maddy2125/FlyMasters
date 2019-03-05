using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using FlyMasters.Business.Models.Mapping;

namespace FlyMasters.Business.Models
{
    public partial class FLYMASTERSContext : DbContext
    {
        static FLYMASTERSContext()
        {
            Database.SetInitializer<FLYMASTERSContext>(null);
        }

        public FLYMASTERSContext()
            : base("Name=FLYMASTERSContext")
        {
        }

        public DbSet<tblImport> tblImports { get; set; }
        public DbSet<tblLead> tblLeads { get; set; }
        public DbSet<tblPrivilege> tblPrivileges { get; set; }
        public DbSet<tblProfile> tblProfiles { get; set; }
        public DbSet<tblSource> tblSources { get; set; }
        public DbSet<tblStatus> tblStatus { get; set; }
        public DbSet<tblUser> tblUsers { get; set; }
        public DbSet<tblUserPrivilege> tblUserPrivileges { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new tblImportMap());
            modelBuilder.Configurations.Add(new tblLeadMap());
            modelBuilder.Configurations.Add(new tblPrivilegeMap());
            modelBuilder.Configurations.Add(new tblProfileMap());
            modelBuilder.Configurations.Add(new tblSourceMap());
            modelBuilder.Configurations.Add(new tblStatusMap());
            modelBuilder.Configurations.Add(new tblUserMap());
            modelBuilder.Configurations.Add(new tblUserPrivilegeMap());
        }
    }
}
