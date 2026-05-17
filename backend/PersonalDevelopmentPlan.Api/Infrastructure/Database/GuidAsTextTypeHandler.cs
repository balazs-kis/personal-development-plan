using System.Data;
using Dapper;

namespace PersonalDevelopmentPlan.Api.Infrastructure.Database;

internal sealed class GuidAsTextTypeHandler : SqlMapper.TypeHandler<Guid>
{
    public override Guid Parse(object value) => value switch
    {
        string s => Guid.Parse(s),
        Guid g => g,
        _ => throw new DataException($"Cannot convert {value?.GetType().Name ?? "null"} to Guid."),
    };

    public override void SetValue(IDbDataParameter parameter, Guid value)
    {
        parameter.DbType = DbType.String;
        parameter.Value = value.ToString();
    }
}
