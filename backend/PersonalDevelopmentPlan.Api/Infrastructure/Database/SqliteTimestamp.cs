using System.Globalization;

namespace PersonalDevelopmentPlan.Api.Infrastructure.Database;

internal static class SqliteTimestamp
{
    // Timestamps are stored as UTC TEXT, either from datetime('now') ("yyyy-MM-dd HH:mm:ss")
    // or from DateTime parameters ("yyyy-MM-dd HH:mm:ss.FFFFFFF").
    public static DateTime Parse(string value) =>
        DateTime.Parse(value, CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal | DateTimeStyles.AdjustToUniversal);

    public static DateTime? ParseNullable(string? value) => value is null ? null : Parse(value);
}
