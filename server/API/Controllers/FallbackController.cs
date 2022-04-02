using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FallbackController : Controller
    {
        [HttpGet("Index")]
        public IActionResult Index()
        {
            return PhysicalFile(
                Path.Combine(
                Directory.GetCurrentDirectory()
                , "wwwroot", "index.html")
                , "text/html");
        }
    }
}