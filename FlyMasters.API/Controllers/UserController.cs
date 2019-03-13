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
    public class UserController : ApiController
    {
        private FLYMASTERSContext _db;

        //RouteAttribute("api/getusers")
        public IEnumerable<UsersListModel> GetUsers()
        {
            _db = new FLYMASTERSContext();

            var users = (from p in _db.tblUsers
                         where p.IsActive == true
                         select p).Select(x => new UsersListModel
                         {
                             UserId = x.UserID,
                             Name = x.FirstName + " " + x.LastName
                         }).ToList();

            return users;
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
