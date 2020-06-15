using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Entities;
using ZAD.Data;
using ZAD.DTO;

namespace ZAD.Repository
{
    public class UserRepository : IUserRepository
    {

        private readonly DataContext dataContext;
        public UserRepository(DataContext _context)
        {
            dataContext = _context;
        }

        public async Task<Guid> addUser(UserPostDto userPostDto)
        {
            UserEntity user = new UserEntity()
            {
                UserId = Guid.NewGuid(),
                FirstName = userPostDto.FirstName,
                LastName = userPostDto.LastName,
                PhotoPath = userPostDto.PhotoPath,
                UserName = userPostDto.UserName,
                Password = userPostDto.Password,
                Role = Role.User,
               
            };
            await dataContext.UsersEntity.AddAsync(user);
            await saveAll();
            return user.UserId;
        }

        public async Task<bool> deleteUser(UserEntity userEntity)
        {
            dataContext.UsersEntity.Remove(userEntity);
            await saveAll();
            return true;
        }      
        public async Task<IEnumerable<UserEntity>> getUsersOnPage(int take, int skip, SortDto sortDto)
        {
                                    
            if(sortDto.SortAsc == 1)
            {
                switch (sortDto.SortField)
                {
                    case "FirstName":
                        return await dataContext.UsersEntity.OrderByDescending(o => o.FirstName).Skip(skip).Take(take).ToListAsync();

                    case "LastName":
                        return await dataContext.UsersEntity.OrderByDescending(o => o.LastName).Skip(skip).Take(take).ToListAsync();
                }
            }
            else
            {
                switch (sortDto.SortField)
                {
                    case "FirstName":
                        return await dataContext.UsersEntity.OrderBy(o => o.FirstName).Skip(skip).Take(take).ToListAsync();

                    case "LastName":
                        return await dataContext.UsersEntity.OrderBy(o => o.LastName).Skip(skip).Take(take).ToListAsync();
                }
            }

            return await dataContext.UsersEntity.ToListAsync();
        }

        public async Task<IEnumerable<UserEntity>> getAllUsers()
        {
            return await dataContext.UsersEntity.ToListAsync();
        }

        public async Task<UserEntity> getUserById(Guid id)
        {
            var user = await dataContext.UsersEntity.FirstOrDefaultAsync(x => x.UserId == id);
            return user;
        }

        public async Task<Boolean> saveAll()
        {
            return await dataContext.SaveChangesAsync() > 0;
        }

        public async Task<NumberUserDto> getNumberOfUsers()
        {
            var user =  dataContext.UsersEntity.ToList();
            NumberUserDto numberUserDto = new NumberUserDto();
            numberUserDto.NumberUsers = user.Count;
       
            return numberUserDto;
        }

        public async Task<IEnumerable<UserEntity>> getUsersToCsv(SortDto sortDto)
        {

            if (sortDto.SortAsc == 1)
            {
                switch (sortDto.SortField)
                {
                    case "FirstName":
                        return await dataContext.UsersEntity.OrderByDescending(o => o.FirstName).ToListAsync();

                    case "LastName":
                        return await dataContext.UsersEntity.OrderByDescending(o => o.LastName).ToListAsync();
                }
            }
            else
            {
                switch (sortDto.SortField)
                {
                    case "FirstName":
                        return await dataContext.UsersEntity.OrderBy(o => o.FirstName).ToListAsync();

                    case "LastName":
                        return await dataContext.UsersEntity.OrderBy(o => o.LastName).ToListAsync();
                }
            }
            return await dataContext.UsersEntity.ToListAsync();
        }

    }
}

