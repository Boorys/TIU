using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebApi.Entities;
using WebApi.Helpers;
using ZAD.DTO;
using ZAD.Repository;

namespace WebApi.Services
{
    public interface IUserService
    {
        AuthenticateDto Authenticate(string username, string password);
        public Task<UserEntity> updateUser(UserEntity userEntity);
        public Task<UserEntity> deleteByUserId(Guid u1serId);

    }

    public class UserService : IUserService
    {     
        private readonly AppSettings _appSettings;
        private readonly IUserRepository userRepository;
        public UserService(IOptions<AppSettings> appSettings, IUserRepository _userRepository)
        {
            _appSettings = appSettings.Value;
            userRepository = _userRepository;
        }


        public AuthenticateDto Authenticate(string username, string password)
        {
            var users = userRepository.getAllUsers().Result;
            var user = users.SingleOrDefault(x => x.UserName == username && x.Password == password);
          
            if (user == null)
                return null;
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString()),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            AuthenticateDto userDto = new AuthenticateDto();
            userDto.Token= tokenHandler.WriteToken(token);
            userDto.Role = user.Role;
    
            return userDto;
        }


        public async Task<UserEntity> deleteByUserId(Guid userId)
        {
            var user = await userRepository.getUserById(userId);

            await userRepository.deleteUser(user);

            return user;
        }

        public async Task<UserEntity> updateUser(UserEntity userEntity)
        {

            var user = await userRepository.getUserById(userEntity.UserId);
            user.LastName = userEntity.LastName;
            user.FirstName = userEntity.FirstName;

            await userRepository.saveAll();

            return user;
        }
    
    }
}