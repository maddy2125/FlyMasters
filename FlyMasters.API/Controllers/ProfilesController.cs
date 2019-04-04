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
        public IEnumerable<DataZoneViewModel> Get(string userId, string isAdmin)
        {
            _db = new FLYMASTERSContext();
            if (isAdmin.ToLower() == "yes")
            {
                var profiles = (from p in _db.tblProfiles
                                where p.Status <= 3
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
                                    Source = _db.tblSources.Where(t => t.SourceId == x.tblImport.SourceID).FirstOrDefault().SourceName,
                                    AssignedTo = _db.tblLeads.Where(t => t.ProfileID == x.ProfileID && t.IsActive == true).FirstOrDefault().tblUser1.UserName
                                }).OrderByDescending(x => x.CreateDate);

                return profiles;
            }
            else
            {
                var UID = int.Parse(userId);
                var profiles = (from p in _db.tblProfiles
                                from l in _db.tblLeads
                                where l.ProfileID == p.ProfileID
                                && l.MappedUserID == UID
                               && l.IsActive == true
                                && p.Status <= 3
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
                                    Source = _db.tblSources.Where(t => t.SourceId == x.tblImport.SourceID).FirstOrDefault().SourceName,
                                    AssignedTo = _db.tblLeads.Where(t => t.ProfileID == x.ProfileID && t.IsActive == true).FirstOrDefault().tblUser1.UserName
                                }).OrderByDescending(x => x.CreateDate);

                return profiles;
            }
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
                    if (profile.Status == 3 && editModel.AssignedTo != 0)
                        profile.Status = 4;
                    else
                        profile.Status = 3;
                    profile.UpdateDate = DateTime.Now;
                    

                    _db.Entry(profile).State = EntityState.Modified;
                    _db.SaveChanges();

                    if (!string.IsNullOrEmpty(editModel.Notes))
                        InsertComment(editModel.ProfileID, editModel.Notes, editModel.ModifyBy);

                    //Assign Lead
                    if (profile.Status == 4 && editModel.AssignedTo != 0)
                    {
                       tblLead presentLead = _db.tblLeads.Where(x => x.ProfileID == profile.ProfileID && x.IsActive == true).FirstOrDefault();
                        if (presentLead != null)
                        {
                            presentLead.IsActive = false;
                            _db.Entry(presentLead).State = EntityState.Modified;
                            _db.SaveChanges();
                        }
                        presentLead = new tblLead();
                        presentLead.ProfileID = profile.ProfileID;
                        presentLead.MappedUserID = editModel.AssignedTo;
                        presentLead.IsActive = true;
                        presentLead.CreateDate = DateTime.Now;
                        presentLead.CreatedBy = editModel.ModifyBy;

                        _db.tblLeads.Add(presentLead);
                        _db.SaveChanges();

                        InsertComment(editModel.ProfileID, "Lead Created", editModel.ModifyBy);
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
        public HttpStatusCode SaveComments(int userId, int profileId, string comments)
        {
            try
            {
                _db = new FLYMASTERSContext();
                // TODO: Add update logic here

                tblProfileNote notes;

                if (!string.IsNullOrEmpty(comments))
                {
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

        [HttpPost]
        [Route("Api/AssignProfiles")]
        public HttpStatusCode AssignProfiles(ProfileMappedModel profileMappedModel)
        {
            try
            {
                _db = new FLYMASTERSContext();
                // TODO: Add update logic here
                tblLead leadInfo;
                string comments = string.Empty;

                foreach (var item in profileMappedModel.SelectedProfileIds)
                {
                    leadInfo = new tblLead();
                    leadInfo.IsActive = true;
                    leadInfo.MappedUserID = profileMappedModel.MappedUserId;
                    leadInfo.CreatedBy = profileMappedModel.UserId;
                    leadInfo.ProfileID = Convert.ToInt32(item);

                    _db.tblLeads.Add(leadInfo);
                    _db.SaveChanges();
                    comments = "User has been assigned.";
                    tblProfileNote notes;

                    if (!string.IsNullOrEmpty(comments))
                    {
                        notes = new tblProfileNote();
                        notes.ProfileId = leadInfo.ProfileID;
                        notes.Description = comments;
                        notes.AddedOn = DateTime.Now;
                        notes.AddedBy = profileMappedModel.UserId;

                        _db.tblProfileNotes.Add(notes);
                        _db.SaveChanges();

                    }
                }

                return HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                return HttpStatusCode.InternalServerError;
            }
        }

        [HttpPost]
        [Route("Api/UploadProfiles")]
        public HttpStatusCode UploadProfiles(IEnumerable<ProfileImportModel> profileImportsModel, string userId, string sourceId)
        {

            try
            {
                _db = new FLYMASTERSContext();

                var user = Convert.ToInt32(userId.ToString());

                if (profileImportsModel.Count() > 0)
                {
                    tblImport imp = new tblImport();
                    imp.CreatedBy = user;
                    imp.SourceID = Convert.ToInt32(sourceId.ToString());
                    imp.ImportedOn = DateTime.Now;
                    _db.tblImports.Add(imp);
                    _db.SaveChanges();

                    tblProfile profile;

                    foreach (var model in profileImportsModel)
                    {
                        profile = new tblProfile();

                        profile.CreateDate = DateTime.Now;
                        profile.CreatedBy = user;
                        profile.FirstName = model.FirstName.Trim();
                        profile.ImportID = imp.ImportID;
                        profile.LastName = model.LastName.Trim();
                        profile.Phone = model.Phone.Trim();
                        profile.Status = 1;
                        profile.Email = model.Email.Trim();

                        _db.tblProfiles.Add(profile);
                        _db.SaveChanges();
                    }
                }
                else
                    return HttpStatusCode.BadRequest;

                return HttpStatusCode.Created;
            }
            catch (Exception)
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

        private void InsertComment(int profileId, string comments, int addedBy)
        {
            tblProfileNote notes = new tblProfileNote();
            notes.ProfileId = profileId;
            notes.Description = comments;
            notes.AddedOn = DateTime.Now;
            notes.AddedBy = addedBy;

            _db.tblProfileNotes.Add(notes);
            _db.SaveChanges();

        }
    }
}
