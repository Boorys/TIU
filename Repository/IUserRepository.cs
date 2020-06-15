using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Entities;
using ZAD.DTO;

namespace ZAD.Repository
{
    public interface IUserRepository
    {

        Task<IEnumerable<UserEntity>> getAllUsers();
        Task<IEnumerable<UserEntity>> getUsersOnPage(int take, int skip, SortDto sortDto);
        Task<IEnumerable<UserEntity>> getUsersToCsv(SortDto sortDto);
        Task<Guid> addUser(UserPostDto userPostDto);
        Task<UserEntity> getUserById(Guid userId);
        Task<Boolean> saveAll();
        Task<Boolean> deleteUser(UserEntity userEntity);  
        Task<NumberUserDto> getNumberOfUsers();
    }
}
