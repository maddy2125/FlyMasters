﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlyMasters.API.ViewModels
{
    public class UsersListModel
    {
        public int UserId { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}