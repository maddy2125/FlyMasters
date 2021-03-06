﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlyMasters.API.ViewModels
{
    public class LoginModel
    {
        public string UserName { get; set; }

        public string Password { get; set; }

        public string Status { get; set; }

        public string Message { get; set; }

        public bool IsAdmin { get; set; }

        public int UserId { get; set; }
    }
}