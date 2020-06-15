using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZAD.DTO
{
    public class UserPutDto
    {
        public Guid UsernId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhotoPath { get; set; }


    }
}
