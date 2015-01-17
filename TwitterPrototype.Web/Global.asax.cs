using System.Web.Http;
using TwitterPrototype.Web.IoC;

namespace TwitterPrototype.Web
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            AutofacWebApi.Initialize(GlobalConfiguration.Configuration);
            WebApiConfig.Configure(GlobalConfiguration.Configuration);
        }
    }
}
