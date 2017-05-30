using Newtonsoft.Json;
using System.Collections.Generic;
using System.Web.Mvc;
using TestMvcApp.Models;

namespace TestMvcApp.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetClients()
        {
            return Json(ReadClientData(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SaveClient(Client client)
        {
            var clients = ReadClientData();

            clients.Add(client);

            string moreClientsJson = JsonConvert.SerializeObject(clients);
            System.IO.File.WriteAllText(Server.MapPath("~/clients.json"), moreClientsJson);

            return Json(ReadClientData());
        }

        private List<Client> ReadClientData()
        {
            var clients = new List<Client>();
            string path = Server.MapPath("~/clients.json");

            if (System.IO.File.Exists(path))
            {
                string clientsJson = System.IO.File.ReadAllText(path);
                clients = JsonConvert.DeserializeObject<List<Client>>(clientsJson);
            }

            return clients;
        }
    }
}
