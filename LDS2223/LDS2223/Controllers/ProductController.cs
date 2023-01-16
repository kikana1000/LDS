using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using LDS2223.Models;

namespace LDS2223.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ProductController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select ID, name, description ,reference, stateID, productionBatchID from dbo.Product";

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
        public JsonResult Add(Product product)
        {
            string query = @"insert into dbo.Product (name,description,reference,stateID,productionBatchID) values (@name,@description,@reference,@stateID,@productionBatchID)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@name", product.name);
                    myCommand.Parameters.AddWithValue("@description", product.description);
                    myCommand.Parameters.AddWithValue("@reference", product.reference);
                    myCommand.Parameters.AddWithValue("@stateID", product.stateID);
                    myCommand.Parameters.AddWithValue("@productionBatchID", product.productionBatchID);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added successfully");
        }

        [HttpPut]
        public JsonResult Edit(Product product)
        {
            string query = @"update dbo.Product set name = @name,description = @description ,reference = @reference,stateID = @stateID, productionBatchID = @productionBatchID where ID = @ID";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ID", product.ID);
                    myCommand.Parameters.AddWithValue("@name", product.name);
                    myCommand.Parameters.AddWithValue("@description", product.description);
                    myCommand.Parameters.AddWithValue("@reference", product.reference);
                    myCommand.Parameters.AddWithValue("@stateID", product.stateID);
                    myCommand.Parameters.AddWithValue("@productionBatchID", product.productionBatchID);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Edited successfully");
        }



    }
}
