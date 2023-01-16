using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using LDS2223.Models;

namespace LDS2223.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public VehicleController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select ID, description, licensePlate ,isActive from dbo.Vehicle";

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
        public JsonResult Add(Vehicle vehicle)
        {
            string query = @"insert into dbo.Vehicle (description,licensePlate,isActive) values (@description,@licensePlate,@isActive)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.Add("@description", SqlDbType.VarChar, 50).Value = vehicle.description;
                    myCommand.Parameters.Add("@licensePlate", SqlDbType.VarChar, 50).Value = vehicle.licensePlate;
                    myCommand.Parameters.Add("@isActive", SqlDbType.Bit).Value = vehicle.isActive;
     
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added successfully");
        }

        [HttpPut]
        public JsonResult Edit(Vehicle vehicle)
        {
            string query = @"update dbo.Vehicle set description = @description,licensePlate = @licensePlate ,isActive = @isActive  where ID = @ID";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ID", vehicle.ID);
                    myCommand.Parameters.AddWithValue("@description",vehicle.description);
                    myCommand.Parameters.AddWithValue("@licensePlate", vehicle.licensePlate);
                    myCommand.Parameters.AddWithValue("@isActive", vehicle.isActive);
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
            string query = @"update dbo.Vehicle set isActive = @isActive  where ID = @ID";

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
