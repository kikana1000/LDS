using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using LDS2223.Models;

namespace LDS2223.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstablishmentController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public EstablishmentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select ID,name, typeID ,address,isActive from dbo.Establishment";

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
        public JsonResult Add(Establishment establishment)
        {
            string query = @"insert into dbo.Establishment (name,typeID,address,isActive) values (@name,@typeID,@address,@isActive)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@name", establishment.name);
                    myCommand.Parameters.AddWithValue("@typeID", establishment.typeID);
                    myCommand.Parameters.AddWithValue("@address", establishment.address);
                    myCommand.Parameters.AddWithValue("@isActive", establishment.isActive);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added successfully");
        }

        [HttpPut]
        public JsonResult Edit(Establishment establishment)
        {
            string query = @"update dbo.Establishment set name=@name, typeID = @typeID,address = @address,isActive = @isActive  where ID = @ID";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ID", establishment.ID);
                    myCommand.Parameters.AddWithValue("@name", establishment.name);
                    myCommand.Parameters.AddWithValue("@typeID", establishment.typeID);
                    myCommand.Parameters.AddWithValue("@address", establishment.address);
                    myCommand.Parameters.AddWithValue("@isActive", establishment.isActive);
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
            string query = @"update dbo.Establishment set isActive = @isActive  where ID = @ID";

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