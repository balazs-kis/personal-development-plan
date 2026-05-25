using System.Security.Cryptography;
using System.Text;

namespace PersonalDevelopmentPlan.Api.Features.Auth;

internal static class GravatarLookup
{
    private static readonly TimeSpan Timeout = TimeSpan.FromSeconds(3);

    public static async Task<string?> TryGetUrlAsync(HttpClient http, string email, CancellationToken ct)
    {
        var hash = HashEmail(email);
        var url = $"https://gravatar.com/avatar/{hash}?d=404&s=200";

        using var cts = CancellationTokenSource.CreateLinkedTokenSource(ct);
        cts.CancelAfter(Timeout);

        try
        {
            using var request = new HttpRequestMessage(HttpMethod.Head, url);
            using var response = await http.SendAsync(request, cts.Token);
            return response.IsSuccessStatusCode ? url : null;
        }
        catch
        {
            return null;
        }
    }

    private static string HashEmail(string email)
    {
        var normalized = email.Trim().ToLowerInvariant();
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(normalized));
        return Convert.ToHexString(bytes).ToLowerInvariant();
    }
}
