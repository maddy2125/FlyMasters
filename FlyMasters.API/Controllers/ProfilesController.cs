using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FlyMasters.Business.Models;
using FlyMasters.API.ViewModels;
using System.Data.Entity;

namespace FlyMasters.API.Controllers
{
    public class ProfilesController : ApiController
    {
        private FLYMASTERSContext _db;

        // GET: api/Profiles
        public IEnumerable<DataZoneViewModel> Get()
        {
            _db = new FLYMASTERSContext();

            var profiles = (from p in _db.tblProfiles
                            join i in _db.tblImports on p.ImportID equals i.ImportID
                            select p).Select(x => new DataZoneViewModel
                            {
                                CreateDate = x.CreateDate.Value,
                                Email = x.Email,
                                FirstName = x.FirstName,
                                LastName = x.LastName,
                                Phone = x.Phone,
                                ProfileID = x.ProfileID,
                                StatusID = x.Status.Value,
                                Status = x.tblStatus.StatusName,
                                Source = _db.tblSources.Where(t => t.SourceId == x.tblImport.SourceID).FirstOrDefault().SourceName
                            }).OrderByDescending(x => x.CreateDate);

            return profiles;
        }

        // GET: api/Profiles/5
        public ProfileEditModel Get(int id)
        {
            _db = new FLYMASTERSContext();

            ProfileEditModel editModel = null;
            var profile = _db.tblProfiles.Find(id);

            if (profile != null)
            {
                editModel = new ProfileEditModel();

                editModel.ProfileID = profile.ProfileID;
                editModel.Email = profile.Email;
                editModel.FirstName = profile.FirstName;
                editModel.LastName = profile.LastName;
                editModel.Phone = profile.Phone;
                editModel.StatusID = profile.Status;
            }

            return editModel;
        }

        // POST: api/Profiles
        public HttpStatusCode Post(ProfileEditModel editModel)
        {
            try
            {
                _db = new FLYMASTERSContext();
                // TODO: Add update logic here

                var profile = _db.tblProfiles.Find(editModel.ProfileID);

                if (profile != null)
                {
                    profile.Email = editModel.Email;
                    profile.FirstName = editModel.FirstName;
                    profile.LastName = editModel.LastName;
                    profile.Phone = editModel.Phone;
                    profile.Status = 3;

                    _db.Entry(profile).State = EntityState.Modified;
                    _db.SaveChanges();

                    return HttpStatusCode.OK;
                }
            }
            catch (Exception ex)
            {
                return HttpStatusCode.InternalServerError;
            }

            return HttpStatusCode.BadRequest;
        }

        // PUT: api/Profiles/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Profiles/5
        public void Delete(int id)
        {
        }
    }
}
