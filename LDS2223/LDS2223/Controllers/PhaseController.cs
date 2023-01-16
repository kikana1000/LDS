using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using LDS2223.Models;

namespace LDS2223.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhaseController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public PhaseController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select ID, name, jsonStructure ,nextPhasesProduct ,nextPhasesMaterial,nextPhasesProductionBatch from dbo.Phases";

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
        public JsonResult Add(Phase phase)
        {
            string query = @"insert into dbo.Phases (name,jsonStructure,nextPhasesProduct,nextPhasesMaterial,nextPhasesProductionBatch) values (@name,@jsonStructure,@nextPhasesProduct,@nextPhasesMaterial,@nextPhasesProductionBatch)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@name", phase.name);
                    myCommand.Parameters.AddWithValue("@jsonStructure", phase.jsonStructure);
                    myCommand.Parameters.AddWithValue("@nextPhasesMaterial", phase.nextPhasesMaterial);
                    myCommand.Parameters.AddWithValue("@nextPhasesProduct", phase.nextPhasesProduct);
                    myCommand.Parameters.AddWithValue("@nextPhasesProductionBatch", phase.nextPhasesProductionBatch);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added successfully");
        }

        [HttpPut]
        public JsonResult Edit(Phase phase)
        {
            string query = @"update dbo.Phases set name = @name,jsonStructure = @jsonStructure ,nextPhasesMaterial = @nextPhasesMaterial ,nextPhasesProduct = @nextPhasesProduct ,nextPhasesProductionBatch = @nextPhasesProductionBatch where ID = @ID";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ID", phase.ID);
                    myCommand.Parameters.AddWithValue("@name", phase.name);
                    myCommand.Parameters.AddWithValue("@jsonStructure", phase.jsonStructure);
                    myCommand.Parameters.AddWithValue("@nextPhasesMaterial", phase.nextPhasesMaterial);
                    myCommand.Parameters.AddWithValue("@nextPhasesProduct", phase.nextPhasesProduct);
                    myCommand.Parameters.AddWithValue("@nextPhasesProductionBatch", phase.nextPhasesProductionBatch);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Edited successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"delete from dbo.Phases where ID = @ID";

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

            return new JsonResult("Deleted successfully");
        }

        [HttpGet("{id}")]
        public JsonResult GetOne(int id)
        {
            string query = @"select ID, name, jsonStructure ,nextPhasesProduct ,nextPhasesMaterial,nextPhasesProductionBatch from dbo.Phases where ID = @ID";

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