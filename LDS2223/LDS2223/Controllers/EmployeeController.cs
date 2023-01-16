using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using LDS2223.Models;

namespace LDS2223.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public EmployeeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select * from dbo.Employee";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Add(Employee employee)
        {
            string query = @"insert into dbo.Employee (name,email,phone,nif,isActive,roleID,password) values (@name,@email,@phone,@nif,@isActive,@roleID,@password)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@name", employee.name);
                    myCommand.Parameters.AddWithValue("@email", employee.email);
                    myCommand.Parameters.AddWithValue("@nif", employee.nif);
                    myCommand.Parameters.AddWithValue("@phone", employee.phone);
                    myCommand.Parameters.AddWithValue("@isActive", employee.isActive);
                    myCommand.Parameters.AddWithValue("@roleID", employee.roleID);
                    myCommand.Parameters.AddWithValue("@password", employee.password);


                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added successfully");
        }

        [HttpPut]
        public JsonResult Edit(Employee employee)
        {
            string query = @"update dbo.Machine set name = @name,phone = @phone,email = @email ,nif = @nif ,isActive = @isActive, roleID=@roleID,password=@passwordID  where ID = @ID";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ID", employee.ID);
                    myCommand.Parameters.AddWithValue("@name", employee.name);
                    myCommand.Parameters.AddWithValue("@email", employee.email);
                    myCommand.Parameters.AddWithValue("@nif", employee.nif);
                    myCommand.Parameters.AddWithValue("@phone", employee.phone);
                    myCommand.Parameters.AddWithValue("@isActive", employee.isActive);
                    myCommand.Parameters.AddWithValue("@roleID", employee.roleID);
                    myCommand.Parameters.AddWithValue("@password", employee.password);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Edited successfully");
        }

        [HttpPut("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"update dbo.Employee set isActive = @isActive  where ID = @ID";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ID", id);
                    myCommand.Parameters.AddWithValue("@isActive", false);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted successfully");
        }

    }
}

