using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using LDS2223.Models;

namespace LDS2223.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MachineController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public MachineController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select ID, name, establishmentID ,aquisitionYear ,functionMachine ,isActive from dbo.Machine";

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
        public JsonResult Add(Machine machine)
        {
            string query = @"insert into dbo.Machine (name,establishmentID,aquisitionYear,functionMachine,isActive) values (@name,@establishmentID,@aquisitionYear,@functionMachine,@isActive)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@name", machine.name);
                    myCommand.Parameters.AddWithValue("@aquisitionYear", machine.aquisitionYear);
                    myCommand.Parameters.AddWithValue("@establishmentID", machine.establishmentID);
                    myCommand.Parameters.AddWithValue("@functionMachine", machine.functionMachine);
                    myCommand.Parameters.AddWithValue("@isActive", machine.isActive);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added successfully");
        }

        [HttpPut]
        public JsonResult Edit(Machine machine)
        {
            string query = @"update dbo.Machine set name = @name,aquisitionYear = @aquisitionYear ,establishmentID = @establishmentID ,functionMachine = @functionMachine ,isActive = @isActive  where ID = @ID";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ID", machine.ID);
                    myCommand.Parameters.AddWithValue("@name", machine.name);
                    myCommand.Parameters.AddWithValue("@functionMachine", machine.functionMachine);
                    myCommand.Parameters.AddWithValue("@establishmentID", machine.establishmentID);
                    myCommand.Parameters.AddWithValue("@aquisitionYear", machine.aquisitionYear);
                    myCommand.Parameters.AddWithValue("@isActive", machine.isActive);
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
            string query = @"update dbo.Machine set isActive = @isActive  where ID = @ID";

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
