﻿using System;
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
    [EnableCors(origins: "http://lead.flymasters.in,http://localhost:4200", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        private FLYMASTERSContext _db;

        [Route("Api/getusers")]
        public IEnumerable<UsersListModel> GetUsers(string allUsers = "-1")
        {
            _db = new FLYMASTERSContext();

            if (allUsers == "-1")
            {
                var users = (from p in _db.tblUsers
                             where p.IsActive == true
                             select p).Select(x => new UsersListModel
                             {
                                 UserId = x.UserID,
                                 FirstName = x.FirstName + " " + x.LastName
                                 ,
                                 LastName = x.FirstName + " " + x.LastName
                                 ,
                                 UserName = x.UserName
                             }).ToList();

                return users;
            }
            else
            {
                var users = (from u in _db.tblUsers
                             from up in _db.tblUserPrivileges
                             from p in _db.tblPrivileges
                             where up.UserID == u.UserID
                             && up.PrivilegeID == p.PrivilegeID
                             && p.PrivilegeName == "Admin"
                             && u.IsActive == true
                             select u).Select(x => new UsersListModel
                             {
                                 UserId = x.UserID,
                                 FirstName = x.FirstName + " " + x.LastName
                                 ,
                                 LastName = x.FirstName + " " + x.LastName
                                 ,
                                 UserName = x.UserName
                             }).ToList();

                return users;
            }
        }

        [Route("Api/getsource")]
        public IEnumerable<SourceListModel> GetSourceList()
        {
            _db = new FLYMASTERSContext();

            var sourceList = (from p in _db.tblSources
                              where p.IsActive == true
                              select p).Select(x => new SourceListModel
                              {
                                  SourceId = x.SourceId,
                                  SourceName = x.SourceName
                              }).ToList();

            return sourceList;
        }

        [Route("Api/UserLogin")]
        [HttpGet]
        public LoginModel Login()
        {
            return new LoginModel { };
        }

        [Route("Api/Login")]
        [HttpPost]
        public LoginModel Login(LoginModel Lg)
        {
            _db = new FLYMASTERSContext();
            try
            {
                if (_db.tblUsers.Where(x => x.UserName == Lg.UserName).Count() == 0)
                {
                    Lg.Status = "Invalid"; Lg.Message = "Invalid User.";
                }
                else
                {
                    var obj = _db.tblUsers.Where(x => x.UserName == Lg.UserName).First();

                    if (obj != null)
                    {
                        if (!obj.IsActive == true)
                        {
                            Lg.Status = "Inactive"; Lg.Message = "User Inactive.";
                        }
                        else if (obj.Password == Lg.Password)
                        {
                            Lg.Status = "Success"; Lg.Message = string.Empty; Lg.UserId = obj.UserID;

                            int adminPrivId = _db.tblPrivileges.Where(x => x.PrivilegeName == "Admin").FirstOrDefault().PrivilegeID;

                            if (obj.tblUserPrivileges.Where(x => x.PrivilegeID == adminPrivId).Count() > 0)
                                Lg.IsAdmin = true;
                        }
                        else
                        {
                            Lg.Status = "Failure"; Lg.Message = "Invalid username/password.";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Lg.Status = "Error"; Lg.Message = ex.Message;
            }
            Lg.Password = string.Empty;
            return Lg;
        }
        //// GET: api/User
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET: api/User/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST: api/User
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT: api/User/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE: api/User/5
        //public void Delete(int id)
        //{
        //}
    }
}
