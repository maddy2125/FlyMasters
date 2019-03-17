using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FlyMasters.Business.Models;
using FlyMasters.API.ViewModels;
using System.Data.Entity;
using System.Web.Http.Cors;

namespace FlyMasters.API.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
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

                var comments = (from pn in _db.tblProfileNotes
                                where pn.ProfileId == profile.ProfileID
                                select pn).Select(x => new ProfileNotesViewModel
                                {
                                    Comments = x.Description,
                                    AddedOn = x.AddedOn.Value,
                                    AddedBy = x.tblUser.UserName
                                }
                               ).OrderBy(x => x.AddedOn);

                editModel.profileNotesViewModel = comments.ToList();
            }

            return editModel;
        }

        // POST: api/Profiles
        [HttpPost]
        
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
                    profile.UpdateDate = DateTime.Now;

                    _db.Entry(profile).State = EntityState.Modified;
                    _db.SaveChanges();

                    tblProfileNote notes;

                    if (!string.IsNullOrEmpty(editModel.Notes))
                    {
                        notes = new tblProfileNote();
                        notes.ProfileId = editModel.ProfileID;
                        notes.Description = editModel.Notes;
                        notes.AddedOn = DateTime.Now;
                        notes.AddedBy = 1;

                        _db.tblProfileNotes.Add(notes);
                        _db.SaveChanges();
                        return HttpStatusCode.OK;
                    }
                    return HttpStatusCode.OK;
                }
            }
            catch (Exception ex)
            {
                return HttpStatusCode.InternalServerError;
            }

            return HttpStatusCode.BadRequest;
        }

        [HttpPost]
        public HttpStatusCode SaveComments(int userId, int profileId, string comments) {
            try
            {
                _db = new FLYMASTERSContext();
                // TODO: Add update logic here

                tblProfileNote notes;

                if (!string.IsNullOrEmpty(comments)) {
                    notes = new tblProfileNote();
                    notes.ProfileId = profileId;
                    notes.Description = comments;
                    notes.AddedOn = DateTime.Now;
                    notes.AddedBy = userId;

                    _db.tblProfileNotes.Add(notes);
                    _db.SaveChanges();
                    return HttpStatusCode.OK;
                }
                return HttpStatusCode.BadRequest;

            }
            catch (Exception ex)
            {
                return HttpStatusCode.InternalServerError;
            }            
        }

        // PUT: api/Profiles/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Profiles/5
        public void Delete(int id)
        {
            //
        }
    }
}
