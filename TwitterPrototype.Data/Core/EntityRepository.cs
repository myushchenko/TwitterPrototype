using System;
using System.Linq;
using System.Linq.Expressions;
using TwitterPrototype.Entities;

namespace TwitterPrototype.Data.Core
{
    public class EntityRepository<TEntity> : IEntityRepository<TEntity>
        where TEntity : class, IEntity
    {
        private readonly IEntitiesContext _dbContext;

        public EntityRepository(IEntitiesContext dbContext)
        {
            if (dbContext == null)
            {
                throw new ArgumentNullException("dbContext");
            }

            _dbContext = dbContext;
        }

        public IQueryable<TEntity> GetAll()
        {
            return _dbContext.Set<TEntity>();
        }


        public IQueryable<TEntity> FindBy(Expression<Func<TEntity, bool>> predicate)
        {
            IQueryable<TEntity> queryable = GetAll().Where<TEntity>(predicate);
            return queryable;
        }

        public void Add(TEntity entity)
        {
            _dbContext.SetAsAdded(entity);
        }

        public void Delete(TEntity entity)
        {
            _dbContext.SetAsDeleted(entity);
        }

        public int Save()
        {
            return _dbContext.SaveChanges();
        }
    }
}
