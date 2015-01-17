using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Validation;
using System.Web.Http.Validation.Providers;

namespace TwitterPrototype.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }

        public static void Configure(HttpConfiguration config)
        {
            // If ExcludeMatchOnTypeOnly is true then we don't match on type only which means
            // that we return null if we can't match on anything in the request. This is useful
            // for generating 406 (Not Acceptable) status codes.
            config.Services.Replace(typeof(IContentNegotiator),
                new DefaultContentNegotiator(excludeMatchOnTypeOnly: true));

            // Remove all the validation providers except for DataAnnotationsModelValidatorProvider
            config.Services.RemoveAll(typeof(ModelValidatorProvider),
                validator => !(validator is DataAnnotationsModelValidatorProvider));
        }
    }
}
