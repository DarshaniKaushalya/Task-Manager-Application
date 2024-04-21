using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Net;

namespace TaskManagerAPI.Controllers
{
    public class ApiErrorMiddleware
    {
    private readonly RequestDelegate _next;
    private readonly ILogger<ApiErrorMiddleware> _logger;

    public ApiErrorMiddleware(RequestDelegate next, ILogger<ApiErrorMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async System.Threading.Tasks.Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unexpected error: {ex}");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async System.Threading.Tasks.Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        var errorDetails = new
        {
            Title = "Internal Server Error",
            Status = context.Response.StatusCode,
            Detail = "Task Manager: An unexpected error occurred while processing your request."
        };

        await context.Response.WriteAsync(JsonConvert.SerializeObject(errorDetails));
    }
}

public static class ApiErrorMiddlewareExtensions
{
    public static IApplicationBuilder UseApiErrorMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<ApiErrorMiddleware>();
    }
}
}
