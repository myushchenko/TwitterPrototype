using System.Reflection;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using TwitterPrototype.Data;
using TwitterPrototype.Data.Core;
using TwitterPrototype.Services;

namespace TwitterPrototype.Web.IoC
{
    public class AutofacWebApi
    {
        public static void Initialize(HttpConfiguration config)
        {
            Initialize(config, RegisterServices(new ContainerBuilder()));
        }

        public static void Initialize(HttpConfiguration config, IContainer container)
        {
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }

        private static IContainer RegisterServices(ContainerBuilder builder)
        {
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterType<TwitterContext>().As<IEntitiesContext>();
            builder.RegisterGeneric(typeof(EntityRepository<>)).As(typeof(IEntityRepository<>));
            builder.RegisterType<TwitterService>().As<ITwitterService>();
            return builder.Build();
        }
    }
}