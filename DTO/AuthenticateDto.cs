using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZAD.DTO
{
    public class AuthenticateDto
    {
        public string Token { get; set; }
        public string Role { get; set; }
    }
}
