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
    public class SupplierController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public SupplierController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select ID, name, description ,email ,phone ,address,isActive from dbo.Supplier";

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
        public JsonResult Add(Supplier supplier)
        {
            string query = @"insert into dbo.Supplier values (@name,@description,@email,@phone,@address,@isActive)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@name", supplier.name);
                    myCommand.Parameters.AddWithValue("@description", supplier.description);
                    myCommand.Parameters.AddWithValue("@email", supplier.email);
                    myCommand.Parameters.AddWithValue("@phone", supplier.phone);
                    myCommand.Parameters.AddWithValue("@address", supplier.address);
                    myCommand.Parameters.AddWithValue("@isActive", supplier.isActive);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added successfully");
        }

        [HttpPut]
        public JsonResult Edit(Supplier supplier)
        {
            string query = @"update dbo.Supplier set name = @name,description = @description ,email = @email ,phone = @phone ,address = @address,isActive = @isActive  where ID = @ID";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ID", supplier.ID);
                    myCommand.Parameters.AddWithValue("@name", supplier.name);
                    myCommand.Parameters.AddWithValue("@description", supplier.description);
                    myCommand.Parameters.AddWithValue("@email", supplier.email);
                    myCommand.Parameters.AddWithValue("@phone", supplier.phone);
                    myCommand.Parameters.AddWithValue("@address", supplier.address);
                    myCommand.Parameters.AddWithValue("@isActive", supplier.isActive);
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

    }
}
