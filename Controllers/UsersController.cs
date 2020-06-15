using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WebApi.Services;
using WebApi.Entities;
using WebApi.Models;
using ZAD.Repository;
using ZAD.DTO;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("user")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private  IUserRepository _userRepository;
      
        public UsersController(IUserService userService, IUserRepository userRepository)
        {
            _userService = userService;
            _userRepository = userRepository;
        
        }
        /// <summary>
        /// Returns AuthenticateDto if login and password are correct. Everyone has access.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        /// POST /user/authenticate
        ///
        /// Base user
        ///    
        ///     {
        ///        	"username":"User",
        ///        	"password":"User" }
        ///   
        /// Admin
        /// 
        ///     POST user/authenticate
        ///     {
        ///        	"username":"Admin",
        ///        	"password":"Admin"}  
        ///     
        /// </remarks>
        /// <response code="200">If login was succesfull, returns AuthenticateDto</response>
        /// <response code="401">If user with provided login and password doesn't exist or password is wrong</response>
        /// <response code="500">If error occured server</response> 
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]AuthenticateModel model)
        {
            var user = _userService.Authenticate(model.Username, model.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }
        /// <summary>
        /// Create new user from UserPostDto. Everyone has access
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /user
        ///     {     	
        ///     
        ///     "FirstName" : "Tom",
        ///     "LastName" : "Nowak",
        ///     "PhotoPath" : "foto.org",
        ///     "UserName" : "MagicznyTom",
        ///     "Password" : "123admin"
        ///    
        /// }
        /// 
        /// </remarks>
        /// <response code="201">If user has been created </response>
        /// <response code="500">If error occured sever</response>
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreatePerson(UserPostDto personToAdd)
        {
            try
            {
                var guid = await _userRepository.addUser(personToAdd);
                return guid == Guid.Empty ? (IActionResult)StatusCode(500) : Ok(guid);
            }
            catch (Exception e)
            {
                return StatusCode(500);
            }
        }
        /// <summary>
        /// Return NumberUserDto. Everyone logged in has access.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /user/number
        ///   
        /// </remarks>
        /// <response code="200">If return NumberUserDto</response>
        /// <response code="500">If error occured</response>  

        [HttpGet("number")]
        public async Task<IActionResult> getNumberUser()
        {
            var number = await _userRepository.getNumberOfUsers();
           
            return Ok(number);
        }
        /// <summary>
        /// Return UserEntity by userId. Everyone logged in has access.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /user/{userId}
        ///   
        /// </remarks>
        /// <response code="200">If return list </response>
        /// <response code="500">If error occured</response>  
        [HttpGet("{id}")]
        public async Task<IActionResult> getUserById(Guid id)
        {
            var user = await _userRepository.getUserById(id);
            return Ok(user);
        }
        /// <summary>
        /// Return list all UserEntity after sorting and pagintaion. Everyone logged in has access
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /user/sort/pagable/{take}/{skip}/{fields}/{ascend}
        ///   
        ///    take - number of downloaded items
        ///    skip - number of items omitted
        /// 
        /// filds - sorting field
        /// ascend-{
        /// 1 - ascend
        /// 2 - descend
        /// }
        /// </remarks>
        /// <response code="200">If return list </response>
        /// <response code="500">If error occured</response>  
        [HttpGet("sort/pagable/{take}/{skip}/{fields}/{ascend}")]
        public async Task<IActionResult> getUserWithSortingAndPagable(int take, int skip,string fields,int ascend)
        {
            SortDto sortDto = new SortDto();
            sortDto.SortAsc = ascend;
            sortDto.SortField = fields;
            var users = await _userRepository.getUsersOnPage(take,  skip, sortDto);          
            return Ok(users);
        }

        /// <summary>
        /// Update existing user by UserEntity. Can be used only by users with Admin status.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     PUT /user
        ///     {     	
        ///     
        ///     "UserId":"566c2800-8d5e-442a-915d-b6f7492e549c",
	    ///     "FirstName": "MarkXD",
        ///     "LastName": "BBB4",
        ///     "PhotoPath": "dsfsdf"
        ///    
        ///    }
        /// 
        /// </remarks>
        /// <response code="200">If item has been modified</response>
        /// <response code="404">If Person with provided id can't be found</response>
        /// <response code="500">If error occured server</response>  
        [Authorize(Roles = Role.Admin)]
        [HttpPut]
        public async Task<IActionResult> updateUser(UserEntity userEntity)
        {
    
            var edited = await _userService.updateUser(userEntity);
            return Ok(edited);
        }
        /// <summary>
        /// Deletes existing user by userId. Can be used only by users with Admin status.
        /// </summary>
        /// Sample request:
        ///
        ///     DELETE /user/{userId}
        /// 
        /// <response code="200">If person was succesfully deleted</response>
        /// <response code="404">If Person with provided id can't be found</response>
        /// <response code="500">If error occured server</response>  
        [Authorize(Roles = Role.Admin)]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeletePerson(Guid id)
        {
            var user = _userService.deleteByUserId(id);
            return Ok(user);
        }
        /// <summary>
        /// Return list all UserEntity after sorting. Everyone logged in has access
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /user/csv/{fields}/{ascend}
        ///     
        /// filds - sorting field
        /// ascend-{
        /// 1 - ascend
        /// 2 - descend
        /// }
        /// </remarks>
        /// <response code="200">If return list </response>
        /// <response code="500">If error occured server</response>
        [HttpGet("csv/{fields}/{ascend}")]
        public async Task<IActionResult> GetAllPeopleCsv(string fields,int ascend)
        {
            SortDto sortDto = new SortDto();
            sortDto.SortAsc = ascend;
            sortDto.SortField = fields;
            var users = await _userRepository.getUsersToCsv(sortDto);
            return Ok(users);
        }

    }
}
