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
    public class ClientController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ClientController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select ID, name, nif ,address ,phone ,email from dbo.Client";

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
        public JsonResult Add(Client client)
        {
            string query = @"insert into dbo.Client values (@name,@nif,@address,@phone,@email)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@name", client.name);
                    myCommand.Parameters.AddWithValue("@nif", client.nif);
                    myCommand.Parameters.AddWithValue("@email", client.email);
                    myCommand.Parameters.AddWithValue("@phone", client.phone);
                    myCommand.Parameters.AddWithValue("@address", client.address);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added successfully");
        }

        [HttpPut]
        public JsonResult Edit(Client client)
        {
            string query = @"update dbo.Client set name = @name,nif = @nif ,email = @email ,phone = @phone ,address = @address  where ID = @ID";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ID", client.ID);
                    myCommand.Parameters.AddWithValue("@name", client.name);
                    myCommand.Parameters.AddWithValue("@nif", client.nif);
                    myCommand.Parameters.AddWithValue("@email", client.email);
                    myCommand.Parameters.AddWithValue("@phone", client.phone);
                    myCommand.Parameters.AddWithValue("@address", client.address);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Edited successfully");
        }

        /*
        [HttpPut("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"update dbo.Supplier set isActive = @isActive  where ID = @ID";

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
        */

    }
}
