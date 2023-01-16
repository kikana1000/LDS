using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using LDS2223.Models;

namespace LDS2223.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductionBatchController : ControllerBase
    {
    
    private readonly IConfiguration _configuration;
    public ProductionBatchController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpGet]
    public JsonResult Get()
    {
        string query = @"select ID, reference, stateID from dbo.ProductionBatch";

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
    public JsonResult Add(ProductionBatch productionBatch)
    {
        string query = @"insert into dbo.ProductionBatch (reference,stateID) values (@reference,@stateID)";

        DataTable table = new DataTable();
        string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
        SqlDataReader myReader;
        using (SqlConnection myCon = new SqlConnection(sqlDataSource))
        {
            myCon.Open();
            using (SqlCommand myCommand = new SqlCommand(query, myCon))
            {
                myCommand.Parameters.AddWithValue("@reference", productionBatch.reference);
                myCommand.Parameters.AddWithValue("@stateID", productionBatch.stateID);

                myReader = myCommand.ExecuteReader();
                table.Load(myReader);
                myReader.Close();
                myCon.Close();
            }
        }

        return new JsonResult("Added successfully");
    }

    [HttpPut]
    public JsonResult Edit(ProductionBatch productionBatch)
    {
        string query = @"update dbo.ProductionBatch set reference = @reference,stateID = @stateID where ID = @ID";

        DataTable table = new DataTable();
        string sqlDataSource = _configuration.GetConnectionString("WindowsAuth");
        SqlDataReader myReader;
        using (SqlConnection myCon = new SqlConnection(sqlDataSource))
        {
            myCon.Open();
            using (SqlCommand myCommand = new SqlCommand(query, myCon))
            {
                myCommand.Parameters.AddWithValue("@ID", productionBatch.ID);
                myCommand.Parameters.AddWithValue("@reference", productionBatch.reference);
                myCommand.Parameters.AddWithValue("@stateID", productionBatch.stateID);
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
