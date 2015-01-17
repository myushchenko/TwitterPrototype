using System;
using System.Linq;
using System.Linq.Expressions;
using TwitterPrototype.Entities;

namespace TwitterPrototype.Data.Core
{
    public interface IEntityRepository<TEntity> where TEntity : class, IEntity
    {
        IQueryable<TEntity> GetAll();
        IQueryable<TEntity> FindBy(Expression<Func<TEntity, bool>> predicate);
        void Add(TEntity entity);
        void Delete(TEntity entity);
        int Save();
    }
}
