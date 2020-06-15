using System.ComponentModel.DataAnnotations;

namespace WebApi.Entities
{
    public class UserEntity
    {

        [Key]
        public System.Guid UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string PhotoPath { get; set; }

    }
}