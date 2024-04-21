using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace TaskManagerAPI.Controllers
{
    public class TaskManagerExceptionFilter: IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            if (context.Exception is TaskManagerException taskManagerException)
            {
                context.Result = new ObjectResult(new ProblemDetails
                {
                    Title = taskManagerException.Title,
                    Status = taskManagerException.StatusCode,
                    Detail = context.Exception.Message
                })
                {
                    StatusCode = taskManagerException.StatusCode
                };

                context.ExceptionHandled = true;
            }
        }
    }
}
