using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FlyMasters.Business.Models;
using FlyMasters.UI.ViewModels;

namespace FlyMasters.UI.Controllers
{
    public class DataZoneController : Controller
    {
        private FLYMASTERSContext _db;

        //
        // GET: /DataZone/

        public ActionResult Index()
        {
            _db = new FLYMASTERSContext();

            var profiles = (from p in _db.tblProfiles
                            join i in _db.tblImports on p.ImportID equals i.ImportID
                            select p).Select(x => new DataZoneViewModel {
                                CreateDate = x.CreateDate.Value,
                                Email = x.Email,
                                FirstName = x.FirstName,
                                LastName = x.LastName,
                                Phone = x.Phone,
                                ProfileID = x.ProfileID,
                                StatusID = x.Status.Value,
                                Status = x.tblStatus.StatusName,
                                Source = _db.tblSources.Where(t => t.SourceId == x.tblImport.SourceID).FirstOrDefault().SourceName                                
                     }).OrderByDescending(x=>x.CreateDate);

            return View(profiles);
        }

        //
        // GET: /DataZone/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /DataZone/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /DataZone/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /DataZone/Edit/5

        public ActionResult Edit(int id)
        {
            _db = new FLYMASTERSContext();

            ProfileEditModel editModel = null;
            var profile = _db.tblProfiles.Find(id);

            if (profile != null) {
                editModel = new ProfileEditModel();

                editModel.ProfileID = profile.ProfileID;
                editModel.Email = profile.Email;
                editModel.FirstName = profile.FirstName;
                editModel.LastName = profile.LastName;
                editModel.Phone = profile.Phone;
                editModel.StatusID = profile.Status;

            }

            return View(editModel);
        }

        //
        // POST: /DataZone/Edit/5

        [HttpPost]
        public ActionResult Edit(ProfileEditModel editModel)
        {
            try
            {
                if (ModelState.IsValid)
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

                    }


                }
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                return View(editModel);
            }
        }

        //
        // GET: /DataZone/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /DataZone/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
