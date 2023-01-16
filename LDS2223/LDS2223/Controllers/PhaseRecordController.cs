using System.Threading.Tasks;
using System.Data;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using LDS2223.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LDS2223.Controllers
{
    [ApiController]
    public class PhaseRecordController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public PhaseRecordController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [Route("api/[controller]")]
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select ID, phaseID, jsonStructure ,date ,hash from dbo.PhaseRecord";

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

        [Route("api/[controller]")]
        [HttpPost]
        public JsonResult Add(PhaseRecord phaseRecord)
        {
            string query = @"insert into dbo.PhaseRecord (phaseID, jsonStructure ,date ,hash) values (@phaseID,@jsonStructure,@date,@hash)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@phaseID", phaseRecord.phaseID);
                    myCommand.Parameters.AddWithValue("@jsonStructure", phaseRecord.jsonStructure);
                    myCommand.Parameters.AddWithValue("@date", phaseRecord.date);
                    myCommand.Parameters.AddWithValue("@hash", phaseRecord.hash);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added successfully");
        }

        [Route("api/[controller]/{id}")]
        [HttpGet]
        public JsonResult GetOne(int id)
        {
            string query = @"select ID, phaseID, jsonStructure ,date ,hash from dbo.PhaseRecord where ID = @ID";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ID", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [Route("api/[controller]/phase/{id}")]
        [HttpGet]
        public JsonResult GetRecordsFromOnePhase(int id)
        {
            string query = @"select ID, phaseID, jsonStructure ,date ,hash from dbo.PhaseRecord where phaseID = @ID";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ID", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

    }
}
